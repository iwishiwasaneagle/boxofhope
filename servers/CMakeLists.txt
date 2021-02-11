cmake_minimum_required(VERSION 3.10)

# set the project name and version
project(Boxofhope VERSION 0.0.1)

# specify the C++ standard
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# control where the static and shared libraries are built so that on windows
# we don't need to tinker with the path to run the executable
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/build")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/build")
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${PROJECT_BINARY_DIR}/build")

option(BUILD_SHARED_LIBS "Build using shared libraries" ON)

configure_file(boxofhopeConfig.h.in boxofhopeConfig.h)

add_subdirectory(io_server)
add_subdirectory(restful_server)
add_subdirectory(sqllib)

add_executable(Boxofhope boxofhope.cpp)

# add the binary tree to the search path for include files
# so that we will find TutorialConfig.h
target_include_directories(Boxofhope PUBLIC
                           "${PROJECT_BINARY_DIR}"
                          )

# Add libnfc to the project
find_package( LibNFC REQUIRED )
message ( STATUS "LibNFC version: ${LIBNFC_VERSION_STRING} ")
include_directories( ${LIBNFC_INCLUDE_DIR} )

# Add Boost to the project
find_package( Boost REQUIRED COMPONENTS system thread  )
include_directories( ${Boost_INCLUDE_DIR} )

# wiringPi only works on the RPi, therefore we must mock the library and it's functions if we are to compile on any other system
EXECUTE_PROCESS( COMMAND uname -m COMMAND tr -d '\n' OUTPUT_VARIABLE ARCHITECTURE )
message( STATUS "Architecture: ${ARCHITECTURE}" )
if( ${ARCHITECTURE} STREQUAL "aarch64" )
    message( STATUS "Using wiringPi" )
    find_package(wiringPi REQUIRED)
else()
    message( STATUS "Using wiringPi-mock" )
    message( AUTHOR_WARNING "You are using the wiringPi-mock library. This means the program compiles as expected. However, any functionality from the original wiringPi library will not be usable." )
    add_subdirectory( wiringPi-mock )
    set( WIRINGPI_INCLUDE_DIRS "${PROJECT_BINARY_DIR}/wiringPi-mock" )
    set( WIRINGPI_LIBRARIES "wiringPi" )
endif()
include_directories( ${WIRINGPI_INCLUDE_DIRS} )
message( STATUS "wiringPi include location: ${WIRINGPI_INCLUDE_DIRS}" )

# LINK THEM ALLLLLL
target_link_libraries(Boxofhope PUBLIC io_server sqllib restful_server ${Boost_LIBRARIES} ${WIRINGPI_LIBRARIES} ${LIBNFC_LIBRARIES} )
