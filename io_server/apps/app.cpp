#include <iostream>
#include <string>
#include <getopt.h>

#include <cstdio> // popen, FILE, fgets, fputs
#include <array>
#include <boost/asio.hpp>
#include <boost/bind/bind.hpp>
#include <fstream>

#include <mainConfig.h>
#include <io_server/io_server.h>

int tests();

/// Print CLI usage for main
void show_usage(){
        std::cerr << "Welcome to " << IO_server_PROJECT_NAME << " (v" << IO_server_VERSION_MAJOR << "."
                  << IO_server_VERSION_MINOR << "." << IO_server_VERSION_PATCH << ")" << std::endl << std::endl
                  << "Usage:" << std::endl
                  << "   -h,--help             Print this message" << std::endl
                  << "   -t                    Run tests" << std::endl
                  << "   -r                    Run io_server" << std::endl
                  << "   -c <PATH>             Config file" << std::endl;

}

int main(int argc, char* argv[]){
    int c;
    while(1){
        static struct option long_options[] = {
            {"help", no_argument, 0, 'h'}
        };
        
        // Store option index
        int option_index = 0;

        // Parse options. Note the flags are the same as bash getopts (probably not a coincidence)
        c = getopt_long(argc,argv, "htrc:", long_options, &option_index);

        // Detect the end of the options
        if (c== -1){
            break;
        }

        switch (c) {
            case 't': 
                return tests();
            case 'h':
                // Help message
                show_usage();
                return 0;
            case 'r':
                // Run the embedded I/O server
                return io::server_run(argc,argv);                
            default:
                show_usage();
                return 1;
        }
        
    }
    return 0;
}


/*! Test function to serve as an example until the team is more up to speed with C++, Doxygen, etc.
 * 
 * \return Exit code
 */
int tests(){
    std::cout << "Start of the test function" << std::endl;


    io::Config config = io::Config();
    config.set_api_url("www.google.com");
    config.set_api_port("6969");
    io::Config::ConfigReturn api_url = config.get_api_url();
    io::Config::ConfigReturn api_port = config.get_api_port();

    std::cout << "api_url value: " << api_url.value << std::endl;
    std::cout << "api_port value: " << api_port.value << std::endl;
    
    io::NFC_Runnable nfc_runnable = io::NFC_Runnable();
    nfc_target tag = nfc_runnable.waitForTag();

    io::is_user_home("127.0.0.1");

    return 0;
}
