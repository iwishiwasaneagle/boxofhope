cmake_minimum_required(VERSION 3.10)

project(wiringPi)

# add the library that runs
set(wiringPi_source_files
        wiringPi-mock.cpp
)
add_library(wiringPi ${wiringPi_source_files})

# state that anybody linking to us needs to include the current source dir
target_include_directories(wiringPi
                           INTERFACE
                            $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
                            $<INSTALL_INTERFACE:include>
                           )

target_link_libraries(wiringPi PUBLIC)
