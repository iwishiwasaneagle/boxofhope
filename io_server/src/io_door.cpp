#include <io_server/io_server.h>

unsigned int io::Door_Helper::blocking_wait_for_door(unsigned int time_ms) {
    int t0;
    t0 = millis();

    if (waitForInterrupt(DOOR_SWITCH_PIN_WP, time_ms, INT_EDGE_BOTH) == 0) {
        return 0;
    };

    return millis() - t0;
}

bool io::Door_Helper::door_state(void) {
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

    return mean > 0.5;
}

io::Door_Runnable::Door_Runnable(void) {
    wiringPiSetup();
    pinMode(DOOR_SWITCH_PIN_WP, OUTPUT);
}

io::Door_Runnable::~Door_Runnable(void) { this->stop(); }

void io::Door_Runnable::runnable(void) {
    io::NFC_Runnable nfcRunnable;
    io::UVC_Runnable uvcRunnable(10);
    bool doorState;
    nfc_target tag;
    while (1) {
        // Create an interruption point for the thread. That is, when
        // thread.interrupt() is called this throws a boost::thread_interrupted
        // error which is caught by Door_Runnable::thread_runner.
        boost::this_thread::interruption_point();

        while ((doorState = io::Door_Helper::door_state()) == 0) {
            std::cout << "\033[0;45;30mio::Door_Runnable\033[0m\tDoor open... "
                         "waiting for it to be shut. "
                      << std::endl;
            io::Door_Helper::blocking_wait_for_door(10000);
        }

        try {
            tag = nfcRunnable.waitForTag();
            auto data = tag.nti.nai.abtUid;
            char tagStr[20];
            sprintf(tagStr, "%02x", data);

            std::cout << "\033[0;45;30mio::Door_Runnable\033[0m\tTag found: "
                      << tagStr << std::endl;
            uvcRunnable.start();
            uvcRunnable.attach();
        } catch (std::runtime_error err) {
            std::cout
                << "\033[0;45;30mio::Door_Runnable\033[0m\tNo tag found..."
                << std::endl;
            continue;
        }
    }
}

void io::Door_Runnable::thread_runner(void) {
    try {
        this->runnable();
    } catch (boost::thread_interrupted &) { //< Catch the boost thread interrupt
        std::cout << "Interrupted thread " << boost::this_thread::get_id()
                  << std::endl;
    }
}

void io::Door_Runnable::start(void) {
    boost::function<void(void)> runner(
        boost::bind(&io::Door_Runnable::thread_runner, this));
    this->thread_group.create_thread(runner);
}

void io::Door_Runnable::stop(void) { this->thread_group.interrupt_all(); }

void io::Door_Runnable::attach(void) { this->thread_group.join_all(); }
