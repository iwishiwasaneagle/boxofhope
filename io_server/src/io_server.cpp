#include <io_server/io_server.h>

#include <chrono>

int io::server_run(int argc, char* argv[]){
    std::cerr << "Starting IO Server" << std::endl;

    if(io::setup_io()>0){
        std::cerr << "io::setup_io() exited with a non-zero exit code."<< std::endl;
        return 1;
    }else{
        std::cerr << "io::setup_io() finished correctly."<< std::endl;
    }


    std::time_t now_time;
    std::chrono::time_point<std::chrono::system_clock> now_timer;
    while(1){
        now_timer = std::chrono::system_clock::now();
        now_time = std::chrono::system_clock::to_time_t(now_timer);
        std::cerr << "io_server heartbeat at " << std::ctime(&now_time)  << std::endl;
        delay(10000);
    }

    return 0;
}


int io::setup_io(void){
    
    /// WiringPi setup function
    wiringPiSetup();
    
    pinMode(DOOR_SWITCH_PIN_WP,INPUT);

    /// Setup door switch ISR on both rising and falling edge
    wiringPiISR(DOOR_SWITCH_PIN_WP, INT_EDGE_BOTH, &io::door_switch_interrupt);

    return 0;
}
