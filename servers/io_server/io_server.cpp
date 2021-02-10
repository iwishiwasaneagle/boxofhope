#include "io_server.h"

int io::server_run(int argc, char* argv[]){
    std::cerr << "Starting IO Server" << std::endl;
    

    if(io::setup_io()>0){
        std::cerr << "io::setup_io() exited with a non-zero exit code."<< std::endl;
    };

    while(1){
        std::cerr << "io_server heartbeat" << std::endl;
        delay(3000);
    }

    return 0;
}


int io::setup_io(void){
    
    /// WiringPi setup function
    wiringPiSetup();


    /// Set door switch as input
    pinMode(DOOR_SWITCH_PIN_WP,INPUT);

    /// Setup door switch ISR on both rising and falling edge
    wiringPiISR(DOOR_SWITCH_PIN_WP, INT_EDGE_BOTH, &io::door_switch_interrupt);

    return 0;
}

void io::door_switch_interrupt(void){
    io::isDoorOpen = digitalRead(DOOR_SWITCH_PIN_WP);
    std::cout << "Is door open? " << io::isDoorOpen << std::endl;
    delay(100); //< Delay for 100 to prevent bouncing
}
