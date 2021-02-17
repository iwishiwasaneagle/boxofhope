# Works with 3.11 and tested through 3.19
cmake_minimum_required(VERSION 3.11...3.19)

# Project name and a few useful settings. Other commands can pick up the results
project(
  IO_server 
  VERSION 0.1.0
  DESCRIPTION "IO_server for Box of Hope"
  LANGUAGES CXX)

# Config file
set(GENERATED_HEADERS ${PROJECT_BINARY_DIR}/generated_headers)
configure_file(config/mainConfig.h.in "${GENERATED_HEADERS}/mainConfig.h")

# Add libnfc to the project
find_library( LIBNFC_LIBRARIES nfc )
find_path( LIBNFC_INCLUDE_DIR nfc )
include_directories( ${LIBNFC_INCLUDE_DIR} )
message( STATUS "LibNFC: ${LIBNFC_INCLUDE_DIR}" )

# Add Boost to the project
find_package( Boost REQUIRED COMPONENTS system thread  )
include_directories( ${Boost_INCLUDE_DIR} )

# Add wiringPi to the project 
find_library( WIRINGPI_LIBRARIES wiringPi )
find_path( WIRINGPI_INCLUDE_DIRS wiringPi )
include_directories( ${WIRINGPI_INCLUDE_DIRS} )
message(STATUS "wiringPi: lib:${WIRINGPI_LIBRARIES}, incl:${WIRINGPI_INCLUDE_DIRS}")

# The compiled library code is here
add_subdirectory(src)

# The executable code is here
add_subdirectory(apps)

# Only do these if this is the main project, and not if it is included through add_subdirectory
if(CMAKE_PROJECT_NAME STREQUAL PROJECT_NAME)
  # Let's ensure -std=c++xx instead of -std=g++xx
  set(CMAKE_CXX_EXTENSIONS OFF)

  # Let's nicely support folders in IDEs
  set_property(GLOBAL PROPERTY USE_FOLDERS ON)

  add_executable(io_server apps/app.cpp)
  target_compile_features(io_server PRIVATE cxx_std_17)

  include_directories(${GENERATED_HEADERS})

  target_link_libraries(io_server PRIVATE ioserver ${Boost_LIBRARIES} ${WIRINGPI_LIBRARIES} ${LIBNFC_LIBRARIES})
endif()
