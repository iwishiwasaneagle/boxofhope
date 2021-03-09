#ifndef IO_UVC_H
#define IO_UVC_H

#include <iostream>

#include "io_server/io_server.h"
#include "utils/api.h"

namespace io {
class UVC_Runnable {
private:
  /**
   * \brief Total time for UVC to stay on
   */
  unsigned int time_s;

  /**
   * \brief Control physical LED state
   *
   * \param state LED state
   */
  void led(bool state);

  /**
   * \brief Handles the logic
   */
  void runnable(void);

  /**
   * \brief Runs the thread via ::io::UVC_Runnable::runnable
   */
  void thread_runner(void);

  /**
   * \brief Thread group to hold the thread running the UVC_Runnable::runnable
   */
  boost::thread_group thread_group;

public:
  /**
   * \brief Start the threaded UVC_Runnable
   *
   */
  void start(void);

  /**
   * \brief Attach to the thread until it finishes. This BLOCKS the thread that
   * it is run from.
   *
   */
  void attach(void);

  /**
   * \brief Stop the thread via a interrupt point within the thread.
   *
   */
  void stop(void);

  /**
   * \brief Construct a new UVC_Runnable object.
   *
   * \param time_s Total time for UVC to stay on
   */
  UVC_Runnable(unsigned int time_s);

  /**
   * \brief Destroy the UVC_Runnable object. Ensures all threads are stopped
   * properly via UVC_Runnable::stop
   */
  ~UVC_Runnable(void);
};
} // namespace io
#endif
