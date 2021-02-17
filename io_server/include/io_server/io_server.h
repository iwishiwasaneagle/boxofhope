#ifndef IO_SERVER_H
#define IO_SERVER_H

#define DOOR_SWITCH_PIN_WP 16 //< Physical pin (indexed by wiringPi ID) for door switch
#define UVC_LED_PIN_WP 15 //< Physical pin (indexed by wiringPi ID) for UV led

#include <iostream>
#include <string>
#include <cstdio> // popen, FILE, fgets, fputs, pclose
#include <array>

#include "wiringPi.h"


#include "io_nfc.h"

/** 
 * Encloses the full life-cycle of the IO server.
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
