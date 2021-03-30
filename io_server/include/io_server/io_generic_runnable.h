#ifndef IO_GENERIC_RUNNABLE_H
#define IO_GENERIC_RUNNABLE_H

namespace io {
    /**
     * \brief Generic runnable for other runnables to extend
     * \test io_server/test/io_generic_runnable.cpp
     */
    struct GenericRunnable {
        virtual void start(void) {
            throw std::runtime_error("void start(void) is not implemeted yet.");
        };
        virtual void stop(void) {
            throw std::runtime_error("void stop(void) is not implemeted yet.");
        };
        virtual void attach(void) {
            throw std::runtime_error("void attach(void) is not implemeted yet.");
        };
    };
} // namespace io
#endif
