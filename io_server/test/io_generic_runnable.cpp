
#include "io_server/io_server.h"
#include <boost/test/unit_test.hpp>
#include <string>

/**
 *  \brief Test the ::io::GenericRunnable
 */
BOOST_AUTO_TEST_CASE(GenericRunnable_test_not_implemented_errors){
    io::GenericRunnable gr;

    try{
        gr.start();
        BOOST_FAIL("Expected std::runtime_error");
    }catch(std::runtime_error& e){
        BOOST_TEST(std::string(e.what()).find("start")!=std::string::npos);
    }

    try{
        gr.stop();
        BOOST_FAIL("Expected std::runtime_error");
    }catch(std::runtime_error& e){
        BOOST_TEST(std::string(e.what()).find("stop")!=std::string::npos);
    }

    try{
        gr.attach();
        BOOST_FAIL("Expected std::runtime_error");
    }catch(std::runtime_error& e){
        BOOST_TEST(std::string(e.what()).find("attach")!=std::string::npos);
    }
}
