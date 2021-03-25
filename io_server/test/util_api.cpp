/// Allow access to private members for testing
#include <boost/test/unit_test.hpp>
#include <string>
#include <vector>

#define private public 
#include "utils/api.h"

#define URL "localhost:3000"

/**
 *  \brief Test the ::API standard operations
 */
BOOST_AUTO_TEST_CASE(API_standard_operations){  
    API_URL = URL;
    
    json res;
    std::vector<std::string> methods = {"GET","PUT","POST","DELETE"};
    std::vector<std::string> endpoints = {"", "test", "very_very_long_wowwweeeeeeeeeeeeeeee"};
    json testBody = {
            {"itemInt",1},
            {"itemStr","string"},
            {"itemArr",{1,2,3}}
        };
    json testHeader = {
            {"hi dr porr","hi dr bailey"},
            {"rtep5","2021"}
    };

    for (std::string method : methods){
        for(std::string endpoint : endpoints){
            res = API::operation(method, "/"+endpoint);
            BOOST_CHECK_EQUAL(res["body"], json({}));
            BOOST_CHECK_EQUAL(res["query"], endpoint);
            
            res = API::operation(method, "/"+endpoint, json({}));
            BOOST_CHECK_EQUAL(res["body"], json({}));
            BOOST_CHECK_EQUAL(res["query"], endpoint);
            
            res = API::operation(method, "/"+endpoint, json({}), json({}));
            BOOST_CHECK_EQUAL(res["body"], json({}));
            BOOST_CHECK_EQUAL(res["query"], endpoint);

            res = API::operation(method, "/"+endpoint, testBody);
            BOOST_CHECK_EQUAL(res["body"], testBody);
            BOOST_CHECK_EQUAL(res["query"], endpoint);
            
            res = API::operation(method, "/"+endpoint, testBody, testHeader);
            BOOST_CHECK_EQUAL(res["body"], testBody);
            for (auto& it : testHeader.items()){
                BOOST_CHECK_EQUAL(res["headers"][it.key()], it.value());
            }
            BOOST_CHECK_EQUAL(res["query"], endpoint);
        }
    }
}
