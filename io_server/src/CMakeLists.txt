# Set library name
set(LIBNAME "libioserver")

# Optionally glob, but only for CMake 3.12 or later:
file(GLOB HEADER_LIST CONFIGURE_DEPENDS "${IO_server_SOURCE_DIR}/include/**/*.h")

add_subdirectory(utils)

# Make an automatic library - will be static or dynamic based on user setting
add_library(${LIBNAME} 
    io_server.cpp 
    io_home.cpp 
    io_door.cpp 
    io_nfc.cpp
    utils/api.cpp
    )

# We need this directory, and users of our library will need it too
target_include_directories(${LIBNAME} PUBLIC ../include)

target_link_libraries(${LIBNAME} PRIVATE wiringPi nfc nlohmann_json::nlohmann_json)

# All users of this library will need at least C++11
target_compile_features(${LIBNAME} PUBLIC cxx_std_11)

# IDEs should put the headers in a nice place
source_group(
    TREE "${PROJECT_SOURCE_DIR}/include"
    PREFIX "Header Files"
    FILES ${HEADER_LIST}
    )

