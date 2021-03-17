#include <io_server/io_server.h>

io::IO_Server::IO_Server(void) {
    std::cerr << "\033[47;30;1mio_server heartbeat\033[;0m\tStarting IO Server"
              << std::endl;

    if (this->setup() > 0) {
        throw std::runtime_error(
            "io::setup_io() exited with a non-zero exit code.");
    } else {
        std::cerr << "\033[47;30;1mio_server "
                     "heartbeat\033[;0m\tio::IO_Server::setup_io() finished "
                     "correctly."
                  << std::endl;
    }
}

io::IO_Server::~IO_Server(void) {}

void signalHandler(int signum) {
    std::cout << "\033[47;30;1mio_server\033[;0m\tInterrupt received ("
              << signum << "). Gracefully shutting down." << std::endl;
    running = false;
}

int io::IO_Server::run(void) {
    // Start is user home state system
    io::IsUserHome_Runnable userHomeRunnable(5);
    // Start door switch state system
    io::Door_Runnable doorRunnable;

    // Start runnables
    userHomeRunnable.start();
    doorRunnable.start();

    Register signalHandler to SIGINT and SIGTERM signal(SIGINT, signalHandler);
    signal(SIGTERM, signalHandler);

    // Check for ctrl+c or other signals every 0.1s. If none and the last
    // heartbeat was sent over 10s ago, send another one.
    std::time_t now_time;
    std::chrono::time_point<std::chrono::system_clock> now_timer;
    std::chrono::time_point<std::chrono::system_clock> lastHeartbeart;
    while (running) {
        now_timer = std::chrono::system_clock::now();
        if (std::chrono::duration_cast<std::chrono::milliseconds>(
                now_timer - lastHeartbeart)
                .count() > 100000) {
            now_time = std::chrono::system_clock::to_time_t(now_timer);
            std::cerr << "\033[47;30;1mio_server heartbeat\033[;0m\t"
                      << std::ctime(&now_time);
            lastHeartbeart = now_timer;
        }
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    // Stop runnables
    userHomeRunnable.stop();
    doorRunnable.stop();

    return 0;
}

int io::IO_Server::setup(void) {
    // WiringPi setup function
    wiringPiSetup();

    return 0;
}
