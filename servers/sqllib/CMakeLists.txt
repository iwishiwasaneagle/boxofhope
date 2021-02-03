cmake_minimum_required(VERSION 3.10)

project(sqllib)

# add the library that runs
set(sqllib_source_files
	sqllib.cpp
)
add_library(sqllib ${sqllib_source_files})

# state that anybody linking to us needs to include the current source dir
target_include_directories(sqllib
                           INTERFACE
                            $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
                            $<INSTALL_INTERFACE:include>
                           )

target_link_libraries(sqllib PUBLIC)

