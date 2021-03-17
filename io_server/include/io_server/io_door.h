#ifndef IO_DOOR_H
#define IO_DOOR_H

namespace io {
class Door_Helper {
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

class Door_Runnable : public GenericRunnable {
  private:
    /**
     * \brief Handles the logic
     */
    void runnable(void);

    /**
     * \brief Runs the thread via ::io::Door_Runnable::runnable
     */
    void thread_runner(void);

    /**
     * \brief Thread group to hold the thread running the
     * Door_Runnable::runnable
     */
    boost::thread_group thread_group;

  public:
    /**
     * \brief Start the threaded Door_Runnable
     *
     */
    void start(void);

    /**
     * \brief Attach to the thread until it finishes. This BLOCKS the thread
     * that it is run from.
     *
     */
    void attach(void);

    /**
     * \brief Stop the thread via a interrupt point within the thread.
     *
     */
    void stop(void);

    /**
     * \brief Construct a new Door_Runnable object.
     *
     */
    Door_Runnable(void);

    /**
     * \brief Destroy the Door_Runnable object. Ensures all threads are stopped
     * properly via Door_Runnable::stop
     */
    ~Door_Runnable(void);
};
} // namespace io

#endif
