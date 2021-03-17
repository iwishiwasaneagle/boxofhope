#include <iostream>
#include <string>
#include <getopt.h>

#include <cstdio> // popen, FILE, fgets, fputs
#include <array>
#include <boost/asio.hpp>
#include <boost/bind/bind.hpp>
#include <fstream>
#include <stdlib.h>

#include <mainConfig.h>
#include <io_server/io_server.h>
#include <utils/api.h>

int tests();

/// Print CLI usage for main
void show_usage(){
        std::cerr << "Welcome to " << IO_server_PROJECT_NAME << " (v" << IO_server_VERSION_MAJOR << "."
                  << IO_server_VERSION_MINOR << "." << IO_server_VERSION_PATCH << ")" << std::endl << std::endl
                  << "Usage:" << std::endl
                  << "   -h,--help                Print this message" << std::endl
                  << "   -t                       Run tests" << std::endl
                  << "   -r                       Run io_server" << std::endl
                  << "   -P,--proxy <ip>:<port>   HTTP proxy address" << std::endl
                  << "   -A,--api   <ip>:<port>   API address" << std::endl
                  << "   -U,--user  <ip>          Home device - the device used to check if the user is home" << std::endl;

}

int main(int argc, char* argv[]){
    int c;

    bool run = false;
    while(1){
        static struct option long_options[] = {
            {"help", no_argument, 0, 'h'},
            {"proxy", required_argument, 0, 'P'},
            {"api", required_argument, 0, 'A'},
            {"user", required_argument, 0, 'U'}
        };

        // Store option index
        int option_index = 0;

        // Parse options. Note the flags are the same as bash getopts (probably not a coincidence)
        c = getopt_long(argc,argv, "htrP:A:U:", long_options, &option_index);

        // Detect the end of the options
        if (c== -1){
            break;
        }


        switch (c) {
            case 'P':
                {
                    std::string proxyStr = std::string(optarg);
                    PROXY_URL = proxyStr;
                    break;
                }
            case 'A':
                {
                    std::string apiStr = std::string(optarg);
                    API_URL  = apiStr;
                    break;
                }
            case 'U':
                {
                    std::string userStr = std::string(optarg);
                    HOME_DEVICE_IP = userStr;
                    break;
                }
            case 't':
                return tests();
            case 'h':
                // Help message
                show_usage();
                return 0;
            case 'r':
                run = true;
                break;
            default:
                show_usage();
                return 1;
        }

    }

    if(run){
        // Run the embedded I/O server
        return io::IO_Server().run();
    }
    return 0;
}


/*! Test function to serve as an example until the team is more up to speed with C++, Doxygen, etc.
 *
 * \return Exit code
 */
int tests(){
    std::cout << "Start of the test function" << std::endl;

    io::UVC_Runnable uvc(20);
    uvc.start();
    uvc.attach();
    uvc.stop();

    // io::NFC_Runnable nfc_runnable = io::NFC_Runnable();
    // nfc_target tag = nfc_runnable.waitForTag();

    io::IsUserHome_Runnable isUserHome_runnable(1);

    isUserHome_runnable.start();

    for(int i=0;i<10;i++){
        std::cout << "This is running in the main thread! (" << boost::this_thread::get_id() << ")" << std::endl;
        sleep(1);
    }

    std::cout << "Stopping IsUserHome runnable from main thread. (" << boost::this_thread::get_id() << ")" << std::endl;
    isUserHome_runnable.stop();

    for(int i=0;i<5;i++){
        std::cout << "This is running in the main thread! (" << boost::this_thread::get_id() << ")" << std::endl;
        sleep(1);
    }

    return 0;
}
