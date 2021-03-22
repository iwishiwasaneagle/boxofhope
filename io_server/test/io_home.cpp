#include "io_server/io_server.h"
#include <boost/test/unit_test.hpp>
#include <string>

/**
 *  \brief Test the ::io::IsUserHome_Runnable non-threaded functionality
 */
BOOST_AUTO_TEST_CASE(IsUserHome_Runnable_test_user_home){
    io::IsUserHome_Runnable iuh_runnable(1);
    
    std::string ip = "127.0.0.1";
    bool isUserHome = iuh_runnable.isUserHome(ip);
    BOOST_CHECK_EQUAL(isUserHome, true);

    ip = "255.255.255.255";
    isUserHome = iuh_runnable.isUserHome(ip);
    BOOST_CHECK_EQUAL(isUserHome, false);

}
