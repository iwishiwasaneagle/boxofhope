# Set library name
set(LIBNAME "ioserver")

# Optionally glob, but only for CMake 3.12 or later:
file(GLOB HEADER_LIST CONFIGURE_DEPENDS "${IO_server_SOURCE_DIR}/include/io_server/*.h")

# Make an automatic library - will be static or dynamic based on user setting
add_library(${LIBNAME} io_server.cpp io_nfc.cpp)

# We need this directory, and users of our library will need it too
target_include_directories(${LIBNAME} PUBLIC ../include)

target_link_libraries(${LIBNAME} PRIVATE wiringPi nfc)

# All users of this library will need at least C++11
target_compile_features(${LIBNAME} PUBLIC cxx_std_11)

# IDEs should put the headers in a nice place
source_group(
    TREE "${PROJECT_SOURCE_DIR}/include"
    PREFIX "Header Files"
    FILES ${HEADER_LIST}
    )

