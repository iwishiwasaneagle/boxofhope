#ifndef IO_SERVER_H
#define IO_SERVER_H

#define DOOR_SWITCH_PIN_WP 1 //< Physical pin (indexed by wiringPi ID) for door switch
#define UVC_LED_PIN_WP 2 //< Physical pin (indexed by wiringPi ID) for UV led

#include <iostream>
#include <string>
#include <cstdio> // popen, FILE, fgets, fputs, pclose
#include <array>

#include "wiringPi.h"

#include "io_nfc.h"
#include "io_home.h"
#include "io_uvc.h"
#include "io_door.h"

/** 
 * Encloses the full life-cycle of the IO server.
 * 
 * IO server namespace. Ensures that if the restful_server.h is imported, the same-named functions/class/etc. don't interact.
 */
namespace io{

    /** Handles the full life-cycle of the IO server.
     *
     * \param argc Argument count
     * \param argv Arguments as a list of list of chars
     *
     * \return Exit code
     */
    int server_run(int argc, char* argv[]);

    /** 
     * Setup the wiringPi pins and correct dataflow as well as interrupts
     * \return Exit code
     */
    int setup_io();
}

#endif
