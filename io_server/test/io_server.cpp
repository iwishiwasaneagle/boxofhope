#include "io_server/io_server.h"
#include <boost/test/unit_test.hpp>
#include <string>

/**
 *  \brief Test the ::io::IO_Server signal handling
 */
BOOST_AUTO_TEST_CASE(IO_Server_test_signalhandling_sigint){
    io::IO_Server io_server;

    BOOST_CHECK_EQUAL(IO_SERVER_RUNNING, true);
    raise(SIGINT);
    BOOST_CHECK_EQUAL(IO_SERVER_RUNNING, false);
}

BOOST_AUTO_TEST_CASE(IO_Server_test_signalhandling_sigterm){
    io::IO_Server io_server;

    BOOST_CHECK_EQUAL(IO_SERVER_RUNNING, true);
    raise(SIGTERM);
    BOOST_CHECK_EQUAL(IO_SERVER_RUNNING, false);
}
