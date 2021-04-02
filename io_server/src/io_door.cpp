#include <io_server/io_server.h>

unsigned int
io::Door_Helper::blocking_wait_for_door(unsigned int time_ms)
{
    int t0;
    t0 = millis();

    if (waitForInterrupt(DOOR_SWITCH_PIN_WP, time_ms, INT_EDGE_BOTH) == 0) {
        return 0;
    };

    return millis() - t0;
}

bool
io::Door_Helper::door_state(void)
{
    const int debounceAvgCount = 5; //< The amount of times to sample the door
                                    // before making a decision on the state.
    unsigned const int debounceDelay =
      10; //< The time between samples. Increase if the output flickers.

    // Debounce the switch by checking average input
    // -> low = 0, high = 1, so we need avg inp > 0.5 to consider door closed
    int count = 0;
    for (int i = 0; i < debounceAvgCount; i++) {
        count += digitalRead(DOOR_SWITCH_PIN_WP);
        delay(debounceDelay);
    }
    float mean = float(count) / debounceAvgCount;

    bool doorState;
    API::DoorState().update(!(doorState = mean > 0.5)); // High = closed

    return doorState;
}

void
io::Door_Runnable::doorIndicatorISR(void)
{
    digitalWrite(
      DOOR_SWITCH_LED_WP,
      !io::Door_Helper::door_state()); /// Remember: Door switch high = door
                                       /// closed, ergo high is off low is on
}

io::Door_Runnable::Door_Runnable(void)
{
    wiringPiSetup();
    pinMode(DOOR_SWITCH_PIN_WP, INPUT);
    pinMode(DOOR_SWITCH_LED_WP, OUTPUT);

    this->doorIndicatorISR();
    wiringPiISR(DOOR_SWITCH_PIN_WP, INT_EDGE_BOTH, &this->doorIndicatorISR);
}

io::Door_Runnable::~Door_Runnable(void)
{
    this->stop();
}

void
io::Door_Runnable::runnable(void)
{
    io::NFC_Runnable nfcRunnable;
    io::UVC_Runnable uvcRunnable(20);
    bool doorState;
    std::string tag;
    long lastSanitisation;
    while (1) {

        // Create an interruption point for the thread. That is, when
        // thread.interrupt() is called this throws a boost::thread_interrupted
        // error which is caught by Door_Runnable::thread_runner.
        boost::this_thread::interruption_point();

        while ((doorState = io::Door_Helper::door_state()) == 1) {
            std::cout
              << "\033[0;45;30mio::Door_Runnable\033[0m\tDoor closed... "
                 "waiting for it to be opened before starting sanitation and "
                 "mask check. "
              << std::endl;
            nfcRunnable.oneShot();
            io::Door_Helper::blocking_wait_for_door(10000);
        }

        while ((doorState = io::Door_Helper::door_state()) == 0) {
            std::cout << "\033[0;45;30mio::Door_Runnable\033[0m\tDoor open... "
                         "waiting for it to be shut. "
                      << std::endl;
            nfcRunnable.oneShot();
            io::Door_Helper::blocking_wait_for_door(10000);
        }

        nfcRunnable.attachOneShot();

        tag = nfcRunnable.waitForTag();
        if (!tag.empty()) {
            std::cout << "\033[0;45;30mio::Door_Runnable\033[0m\tTag found: "
                      << tag << std::endl;

            if ((lastSanitisation = API::UVCState().get()) > (24 * 60 * 60)) {
                std::cout
                  << "\033[0;45;30mio::Door_Runnable\033[0m\tLast sanitsation "
                  << lastSanitisation
                  << "s ago (long enough, starting process.)" << std::endl;

                uvcRunnable.start();
                uvcRunnable.attach();

                API::UVCState().update(0);

                std::time_t result = std::time(nullptr);
            } else {
                std::cout
                  << "\033[0;45;30mio::Door_Runnable\033[0m\tLast sanitsation "
                  << lastSanitisation << "s ago (too recent, skipping.)"
                  << std::endl;
            }
        } else {
            std::cout
              << "\033[0;45;30mio::Door_Runnable\033[0m\tNo tag found..."
              << std::endl;
        }
        nfcRunnable.waitForTag(); // Run once more to update the server
    }
}

void
io::Door_Runnable::thread_runner(void)
{
    try {
        this->runnable();
    } catch (boost::thread_interrupted&) { //< Catch the boost thread interrupt
        std::cout << "Interrupted thread " << boost::this_thread::get_id()
                  << std::endl;
    }
}

void
io::Door_Runnable::start(void)
{
    boost::function<void(void)> runner(
      boost::bind(&io::Door_Runnable::thread_runner, this));
    this->thread_group.create_thread(runner);
}

void
io::Door_Runnable::stop(void)
{
    this->thread_group.interrupt_all();
}

void
io::Door_Runnable::attach(void)
{
    this->thread_group.join_all();
}
