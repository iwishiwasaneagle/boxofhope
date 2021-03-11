#ifndef IO_SERVER_H
#define IO_SERVER_H

/// Physical pin (indexed by wiringPi ID) for door switch
#define DOOR_SWITCH_PIN_WP 1
/// Physical pin (indexed by wiringPi ID) for UV led
#define UVC_LED_PIN_WP 2

#include <array>
#include <cstdio> // popen, FILE, fgets, fputs, pclose
#include <iostream>
#include <string>
#include <stdexcept>

#include "wiringPi.h"

#include "io_door.h"
#include "io_home.h"
#include "io_nfc.h"
#include "io_uvc.h"

/**
 * Encloses the full life-cycle of the IO server.
 *
 * IO server namespace. Ensures that if the restful_server.h is imported, the
 * same-named functions/class/etc. don't interact.
 */
namespace io {
  class IO_Server {
    private:
      /**
       * Setup the wiringPi pins and correct dataflow as well as interrupts
       * \return Exit code
       */
      int setup(void);

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
#endif