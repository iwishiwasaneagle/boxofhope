#ifndef IO_DOOR_H
#define IO_DOOR_H

#include <io_server/io_server.h>

#include <wiringPi.h>

namespace io{
    class Door_Helper{
        public:
            /**
             * \brief Wait for the door button to generate a signal.
             *
             * \param time_ms Timeout in milliseconds.
             *
             * \return Remaining time on the timeout. 0 if timeout was reached.
             */ 
            static unsigned int blocking_wait_for_door(unsigned int time_ms); 

            /**
             * \brief Get the current door state
             *
             * \return Door state
             */
            static bool door_state(void);
    };
}

#endif
