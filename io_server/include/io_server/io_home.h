#ifndef IO_HOME_H
#define IO_HOME_H

#include <boost/asio.hpp>
#include <boost/function.hpp>
#include <boost/bind/bind.hpp>
#include <boost/thread.hpp>

#include <iostream>

#include "utils/api.h"

inline std::string HOME_DEVICE_IP = "";

namespace io{
    class IsUserHome_Runnable{
        private:
            /// Interval in seconds
            std::chrono::seconds interval;            

            /**
             * \brief Responsible for the boost::asio::stead_timer extending it's run time, thus creating a periodic timer.
             * 
             * @param timer The timer object
             * @param callback Our callback that is being run every loop. Currently set to IsUserHome_Runnable::isUserHome.
             * @param interval The interval in seconds
             */
            static void runnable(const boost::system::error_code&, boost::asio::steady_timer* timer, boost::function<void(void)> callback, std::chrono::seconds interval);

            /**
             * \brief Registers the boost::asio::steady_timer, boost::asio::io_context, etc. as required. Handles the thread interrupt logic.
             */
            void thread_runner(void);
            
            /// Thread group to hold the thread running the IsUserHome_runnable::runnable
            boost::thread_group thread_group;
        public:

            /**
             * \brief Start the threaded periodic call to IsUserHome_Runnable::isUserHome
             * 
             */
            void start(void);

            /**
             * \brief Attach to the thread until it finishes. This BLOCKS the thread that it is run from.
             * 
             */
            void attach(void);

            /**
             * \brief Stop the periodic thread via a interrupt point within the thread.
             * 
             */
            void stop(void);

            /** Pings an ip address, if the ip is pingable it's deemed that the user is home
             * \param ip User's mobile phone IP address.
             * 
             * \return 0 if the user is home, 1 if not.
             */
            bool isUserHome(std::string ip);

            /**
             * \brief Construct a new IsUserHome_Runnable object
             *  
             * \param interval_s Time interval for periodic async timer running IsUserHome_Runnable::isUserHome
             */
            IsUserHome_Runnable(int interval_s);

            /**
             * \brief Destroy the IsUserHome_Runnable object. Ensures all threads are stopped properly via IsUserHome_Runnable::stop
             */
            ~IsUserHome_Runnable(void); 

    };
}
#endif
