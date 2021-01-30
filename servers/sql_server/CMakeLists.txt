# add the library that runs
set(sql_server_source_files
	sql_server.cpp
)
add_library(sql_server ${sql_server_source_files})

# state that anybody linking to us needs to include the current source dir
# to find MathFunctsqlns.h, while we don't.
target_include_directories(sql_server
                           INTERFACE
                            $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}>
                            $<INSTALL_INTERFACE:include>
                           )

target_link_libraries(sql_server PUBLIC)
