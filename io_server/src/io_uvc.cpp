#include "io_server/io_uvc.h"


io::UVC_Runnable::UVC_Runnable(unsigned int time_s):           
    time_s(time_s)
    {}

io::UVC_Runnable::~UVC_Runnable(void){    
    this->stop();
}

void io::UVC_Runnable::led(bool state){
    digitalWrite(UVC_LED_PIN_WP, state);
}

void io::UVC_Runnable::runnable(void){
    // Create an interruption point for the thread. That is, when thread.interrupt() is called this throws a boost::thread_interrupted error which is caught by UVC_Runnable::thread_runner.
    boost::this_thread::interruption_point();
}

void io::UVC_Runnable::thread_runner(void){
    try{
        unsigned int remaining_time_ms = this->time_s*1000;
        do{
            this->led(true);
            remaining_time_ms = io::Door_Helper::blocking_wait_for_door(remaining_time_ms);        
            this->led(false);
            delay(1000); // TODO remove debug wait here
        }
        while(remaining_time_ms>1);

    }catch(boost::thread_interrupted&){ //< Catch the boost thread interrupt
        std::cout << "Interrupted thread " << boost::this_thread::get_id() << std::endl;
    }
}

void io::UVC_Runnable::start(void){
    boost::function<void (void)> runner( boost::bind( &io::UVC_Runnable::thread_runner, this) );
    this->thread_group.create_thread(runner);
}

void io::UVC_Runnable::stop(void){
    this->thread_group.interrupt_all();
}

void io::UVC_Runnable::attach(void){
    this->thread_group.join_all();
}
