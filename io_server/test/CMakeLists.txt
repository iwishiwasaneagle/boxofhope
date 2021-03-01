include_directories("${CMAKE_SOURCE_DIR}/include")

# Get memer source files
file(GLOB SOURCE_FILES "${CMAKE_SOURCE_DIR}/src/*.cpp")

# Get io_server_tests source files, build, and link
file(GLOB TEST_SOURCE_FILES "${CMAKE_SOURCE_DIR}/test/*.cpp")
add_executable(io_server_tests ${TEST_SOURCE_FILES} ${SOURCE_FILES})


SET(COVERAGE OFF CACHE BOOL "Coverage")
if(COVERAGE)
    target_link_libraries(io_server_tests ${Boost_UNIT_TEST_FRAMEWORK_LIBRARY} ${LIBRARIES_LIST} --coverage)
    target_compile_options(io_server_tests PRIVATE --coverage)
else()
    target_link_libraries(io_server_tests ${Boost_UNIT_TEST_FRAMEWORK_LIBRARY} ${LIBRARIES_LIST})
endif()


# Add all Boost io_server_testss to CTest
add_definitions(-DBOOST_TEST_DYN_LINK)
foreach(TEST_SOURCE_FILE ${TEST_SOURCE_FILES})
    file(READ "${TEST_SOURCE_FILE}" TEST_SOURCE_FILE_CONTENTS)
    string(REGEX MATCHALL "BOOST_AUTO_TEST_CASE\\( *([A-Za-z_0-9]+) *\\)" 
            FOUND_TESTS ${TEST_SOURCE_FILE_CONTENTS})

    # Register each io_server_tests
    foreach(HIT ${FOUND_TESTS})
        string(REGEX REPLACE ".*\\( *([A-Za-z_0-9]+) *\\).*" "\\1" TEST_NAME ${HIT})
        message( STATUS "Registering io_server_tests.${TEST_NAME}")
        add_test(NAME "io_server_tests.${TEST_NAME}" 
                 COMMAND io_server_tests
                 --run_test=${TEST_NAME})
    endforeach()
endforeach()
