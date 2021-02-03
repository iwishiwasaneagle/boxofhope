#ifndef IO_SERVER
#define IO_SERVER

#include <iostream>

/// IO server namespace. Ensures that if the restful_server.h is imported, the same-named functions/class/etc. don't interact.
namespace io{
    /*! Handles the full life-cycle of the IO server.
     *
     * \param argc Argument count
     * \param argv Arguments as a list of list of chars
     *
     * \return Exit code
     */
    int server_run(int argc, char* argv[]);
}

#endif
