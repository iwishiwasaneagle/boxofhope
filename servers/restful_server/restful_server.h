#ifndef RESTFUL_SERVER
#define RESTFUL_SERVER

#include <iostream>

/// RESTful server namespace. Ensures that if the io_server.h is imported, the same-named functions/class/etc. don't interact.
namespace restful{
    /*! Handles the full life-cycle of the the RESTful serve.
     *
     * \param argc Argument count 
     * \param argv Arguments as a list of list of chars 
     *
     * \return Exit code
     */
    int server_run(int argc, char* argv[]);
}

#endif
