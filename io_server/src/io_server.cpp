#include <io_server/io_server.h>

#include <chrono>

io::IO_Server::IO_Server(void){
    std::cerr << "\033[47;30;1mio_server heartbeat\033[;0m\tStarting IO Server" << std::endl;

    if(this->setup()>0){
        throw std::runtime_error("io::setup_io() exited with a non-zero exit code.");
    }else{
        std::cerr << "\033[47;30;1mio_server heartbeat\033[;0m\tio::IO_Server::setup_io() finished correctly."<< std::endl;
    }


}

io::IO_Server::~IO_Server(void){}

int io::IO_Server::run(void){
    // Start is user home state system
    io::IsUserHome_Runnable userHome(5);
    userHome.start();

    // Start door switch state system
    io::Door_Runnable door;
    door.start();

    std::time_t now_time;
    std::chrono::time_point<std::chrono::system_clock> now_timer;
    while(1){
        now_timer = std::chrono::system_clock::now();
        now_time = std::chrono::system_clock::to_time_t(now_timer);
        std::cerr << "\033[47;30;1mio_server heartbeat\033[;0m\t" << std::ctime(&now_time);
        delay(10000);
    }
    
    userHome.stop();
    door.stop();
    return 0;
}


int io::IO_Server::setup(void){    
    /// WiringPi setup function
    wiringPiSetup();

    return 0;
}