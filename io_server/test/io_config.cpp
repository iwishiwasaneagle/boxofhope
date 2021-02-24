#include <io_server/io_config.h>
#include <boost/test/unit_test.hpp>
#include <fstream>
#include <string>

/**
 *  \brief Test the ::io::Config constructor from a std::ifstream input
 */
BOOST_AUTO_TEST_CASE(Config_constructor_test_from_file){
    std::string path = "io_config.json";
    std::ifstream file(path);
    if(file.fail()){
        BOOST_FAIL("File "+path+" doesn't exist.");
    }
    json testObject = json::parse(file);

    // Reset the file
    file.seekg(0); // move to beginning
    file.clear();  // clear flags (like EOF) 

    io::Config conf(file);
    BOOST_CHECK_EQUAL(conf.config,testObject);
}

/**
 *  \brief Test the ::io::Config constructor from a string input
 */
BOOST_AUTO_TEST_CASE(Config_constructor_test_from_string){
    std::string input = "{\"hi\":123}";
    
    json testObject = json::parse(input);
    io::Config conf(input);

    BOOST_CHECK_EQUAL(conf.config,testObject);
}
