#ifndef IO_SERVER_H
#define IO_SERVER_H

/// Physical pin (indexed by wiringPi ID) for door switch
#define DOOR_SWITCH_PIN_WP 1
/// Physical pin (indexed by wiringPi ID) for door state led indicator
#define DOOR_SWITCH_LED_WP 3
/// Physical pin (indexed by wiringPi ID) for UV led
#define UVC_LED_PIN_WP 2

#include <array>
#include <chrono>
#include <condition_variable>
#include <cstdio> // popen, FILE, fgets, fputs, pclose
#include <iostream>
#include <stdexcept>
#include <string>
#include <thread>
#include <vector>

#include <boost/asio.hpp>
#include <boost/bind/bind.hpp>
#include <boost/function.hpp>
#include <boost/thread.hpp>

#include "wiringPi.h"

#include "io_generic_runnable.h"
#include "io_door.h"
#include "io_home.h"
#include "io_nfc.h"
#include "io_uvc.h"

#include "utils/api.h"

/**
 * Encloses the full life-cycle of the IO server.
 *
 * IO server namespace. Ensures that if the restful_server.h is imported, the
 * same-named functions/class/etc. don't interact.
 */
namespace io {
/**
 * \brief Main class for handling all IO operations. Embodies the core of the Box Of Hope runtime
 * \test io_server/test/io_server.cpp
 */
class IO_Server 
{
  private:
    /**
     * Setup the wiringPi pins and correct dataflow as well as interrupts
     * \return Exit code
     */
    int setup(void);

    /**
     * Handle signals from OS
     * \param signum SIGTERM, SIGINT, etc.
     */
    static void signalHandler(int signum);

  public:
    /** Handles the full life-cycle of the IO server.
     *
     * \return Exit code
     */
    int run(void);

    IO_Server(void);
    ~IO_Server(void);
};
} // namespace io

/// Global variable to allow sigint and sigterm handling
inline volatile bool IO_SERVER_RUNNING = true;
#endif
