#include "io_server.h"

int io::server_run(int argc, char* argv[]){
    std::cerr << "Starting IO Server" << std::endl;
    return 0;
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
