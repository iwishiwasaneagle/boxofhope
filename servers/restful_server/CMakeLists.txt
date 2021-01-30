# add the library that runs
set(restful_server_source_files
	restful_server.cpp
)
add_library(restful_server ${restful_server_source_files})

# state that anybody linking to us needs to include the current source dir
# to find MathFunctrestfulns.h, while we don't.
target_include_directories(restful_server
                           INTERFACE
                            $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
                            $<INSTALL_INTERFACE:include>
                           )

target_link_libraries(restful_server PUBLIC)
