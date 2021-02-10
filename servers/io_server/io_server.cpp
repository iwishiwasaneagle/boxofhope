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


int io::is_user_home(std::string ip){
    std::array<char, 128> buffer;
	std::string cmd = "ping -c1 ";
    FILE* f = popen((cmd + ip).c_str(), "r"); //< Uses `ping` for now, move towards nmap -sP with sudo to detect mac addresses

    if(!f){
        std::cerr << "Couldn't start command" << std::endl;
        return 1;
    }

    while (fgets(buffer.data(), 128, f) != NULL) {
        buffer.data(); //< Clear buffer, we don't care about output just exit code
    }
    int returnCode = pclose(f); //< returns 0 on success, 256 on error

    std::string isUserHome = "no";
    if(returnCode==0){
        isUserHome = "yes";
    }

    std::cout << "Is the user home (" <<ip<< ")? " <<  isUserHome  << std::endl;
	return returnCode/256;
}
