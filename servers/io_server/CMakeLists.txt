# add the library that runs
set(io_server_source_files
	io_server.cpp
    io_nfc.cpp
)
add_library(io_server ${io_server_source_files})

# state that anybody linking to us needs to include the current source dir
# to find MathFunctions.h, while we don't.
target_include_directories(io_server
                           INTERFACE
                            $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
                            $<INSTALL_INTERFACE:include>
                           )

target_link_libraries(io_server PUBLIC wiringPi)

