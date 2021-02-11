#ifndef IO_SERVER
#define IO_SERVER

#define DOOR_SWITCH_PIN_WP 16
#define UVC_LED_PIN_WP 15

#include <iostream>
#include <string>
#include <cstdio> // popen, FILE, fgets, fputs, pclose
#include <array>

#include "wiringPi.h"

    /** 
     * Handles the full life-cycle of the IO server.
     * 
     * IO server namespace. Ensures that if the restful_server.h is imported, the same-named functions/class/etc. don't interact.
     */
namespace io{
    /** Handles the full life-cycle of the IO server.
     *
     * \param argc Argument count
     * \param argv Arguments as a list of list of chars
     *
     * \return Exit code
     */
    int server_run(int argc, char* argv[]);

    /** 
     * Setup the wiringPi pins and correct dataflow as well as interrupts
     * \return Exit code
     */
    int setup_io();

    /** 
     * Interrupt function for the door switch
     */
    void door_switch_interrupt(void);

    volatile bool isDoorOpen = false; //< Door open or closed boolean variable. Edited by door_switch_interrupt.
    volatile bool isInterruptRunning = false; //< Is the interrupt running? Prevents multiple interrupts from running due to bounce. 
    const int debounceAvgCount = 10; //< The amount of times to sample the door before making a decision on the state.
    unsigned const int debounceDelay = 20; //< The time between samples. Increase if the output flickers.
    
    /** Pings an ip address, if the ip is pingable it's deemed that the user is home
     * \param ip User's mobile phone IP address.
     * 
     * \return 0 if the user is home, 1 if not.
     *
     * \code{.cpp}
     // Async call of the is_user_home functin on ip 192.168.0.65 a total of 10 times before exiting.
	 void is_user_home_callback(const boost::system::error_code&, boost::asio::steady_timer* t, int* count){
     	io::is_user_home(std::string("192.168.0.65"));
	  	if(*count < 10){
	  		*count++;
	    		t->expires_at(t->expiry() + boost::asio::chrono::seconds(1));
	         t->async_wait(boost::bind(is_user_home_callback, boost::asio::placeholders::error, t, count));
	     }
	  }
     
	 int main(){
	     std::cout << "Start of the test function" << std::endl;
     
     	boost::asio::io_context io;
     	int count = 0;
   	 	boost::asio::steady_timer t(io, boost::asio::chrono::seconds(5));
     	t.async_wait(boost::bind(is_user_home_callback, boost::asio::placeholders::error, &t, &count));
     
   	 	std::cout << "This is running whilst the asio timer is running!" << std::endl;
     
     	io.run();
     
     	return 0;
	 }
     \endcode
     **/
    int is_user_home(std::string ip);
}

#endif
