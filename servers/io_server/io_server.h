#ifndef IO_SERVER
#define IO_SERVER

#define DOOR_SWITCH_PIN_WP 14
#define UVC_LED_PIN_WP 15

#include <iostream>
#include "wiringPi.h"

/// IO server namespace. Ensures that if the restful_server.h is imported, the same-named functions/class/etc. don't interact.
namespace io{
    /** 
     * Handles the full life-cycle of the IO server.
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

    /** 
     * Interrupt function for the door switch
     */
    void door_switch_interrupt(void);

    /**
     * Door open or closed boolean variable. Edited by door_switch_interrupt.
     */
    volatile bool isDoorOpen = false;
}

#endif
