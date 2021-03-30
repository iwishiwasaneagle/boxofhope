#include "io_server/io_server.h"

io::UVC_Runnable::UVC_Runnable(unsigned int time_s)
  : time_s(time_s)
{
    wiringPiSetup();
    pinMode(UVC_LED_PIN_WP, OUTPUT);
}

io::UVC_Runnable::~UVC_Runnable(void)
{
    this->stop();
}

void
io::UVC_Runnable::led(bool state)
{
    digitalWrite(UVC_LED_PIN_WP, state);
}

void
io::UVC_Runnable::runnable(void)
{

    std::cout << "\033[1;46;30mio::UVC_Runnable\033[0m\tStarting sanitization "
                 "process"
              << std::endl;

    int remaining_time_ms = this->time_s * 1000;
    int t0, t1, ret;
    bool door_state;

    // WTF is happening here?
    //
    // So when the door is closed after a mask is registered, we run this wee
    // bundle of joy. In this block we ensure the door is closed (the first
    // while within the do-while), and then turn the LED on. After this, the
    // door pin is listened to (using poll!!!! Jan-Hendrik strengthened the
    // WiringPi library to essential create a DIY `wiringPiISR` here
    // https://github.com/WiringPi/WiringPi/pull/102 as this runnable is run in
    // a thread) for changes in the pin. If this change is because of the door
    // opening (the do-while within the do-while) then we turn off the LEDs.
    // Alternatively, if the io::Door_Helper::blocking_wait_for_door times out
    // and the remaining_time_ms is below 0, the LED's are alsoed turned off
    // (obviously).
    do {
        while (!(door_state = io::Door_Helper::door_state())) {
            io::Door_Helper::blocking_wait_for_door(10000);
        }

        this->led(true);
        do {
            t0 = millis();
            ret = io::Door_Helper::blocking_wait_for_door(remaining_time_ms);
            t1 = millis();
            remaining_time_ms -= (t1 - t0);
            // Door closed and time remaining. We do this check so that if the
            // blocking poll call triggers for whatever reason, it resets
            // itself.
        } while ((door_state = io::Door_Helper::door_state()) &&
                 remaining_time_ms > 0);
        this->led(false);

        // Create an interruption point for the thread. That is, when
        // thread.interrupt() is called this throws a boost::thread_interrupted
        // error which is caught by UVC_Runnable::thread_runner.
        boost::this_thread::interruption_point();

        if (remaining_time_ms > 0)
            std::cout << "\033[1;46;30mio::UVC_Runnable\033[0m\t Pausing "
                         "sanitization process (door state:"
                      << (door_state ? "closed" : "open") << ")" << std::endl;

        // If the door is openend, and the sterilization time has not
        // been met the LED turns back on when the door closes.
    } while (remaining_time_ms > 0);

    std::cout << "\033[1;46;30mio::UVC_Runnable\033[0m\t Sanitization process "
                 "completed after "
              << (int)(millis() - t0) / 1000 << "s" << std::endl;
}

void
io::UVC_Runnable::thread_runner(void)
{
    try {
        this->runnable();
    } catch (boost::thread_interrupted&) { //< Catch the boost thread interrupt
        std::cout << "Interrupted thread " << boost::this_thread::get_id()
                  << std::endl;
    }
}

void
io::UVC_Runnable::start(void)
{
    boost::function<void(void)> runner(
      boost::bind(&io::UVC_Runnable::thread_runner, this));
    this->thread_group.create_thread(runner);
}

void
io::UVC_Runnable::stop(void)
{
    digitalWrite(UVC_LED_PIN_WP, LOW);
    this->thread_group.interrupt_all();
}

void
io::UVC_Runnable::attach(void)
{
    this->thread_group.join_all();
}
