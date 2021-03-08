#include "io_server/io_home.h"

bool io::IsUserHome_Runnable::isUserHome(std::string ip){
    std::array<char, 128> buffer;
	std::string cmd = "ping -c1 ";
    FILE* f = popen((cmd + ip).c_str(), "r"); //< Uses `ping` for now, move towards nmap -sP with sudo to detect mac addresses

    if(!f){
        std::cerr << "Couldn't start command" << std::endl;
        return 1;
    }

    while (fgets(buffer.data(), 128, f) != NULL) {
        buffer.data(); //< Clear buffer, we don't care about output just exit code
    }
    int returnCode = pclose(f); //< returns 0 on success, 256 on error

    std::cout << "\033[1;44mIsUserHome_Runnable heartbeat\033[0m - IP " << ip;
    bool home = false;
    if(returnCode==0){
        std::cout << " \033[1;32mwas\033[0m found" << std::endl;
    }else{
        std::cout << " \033[1;31mwasn't\033[0m found" << std::endl;
    }

    API::HomeState::update(home);

    return home;
}

io::IsUserHome_Runnable::IsUserHome_Runnable(int interval_s):           
    interval(interval_s)
    {}

io::IsUserHome_Runnable::~IsUserHome_Runnable(void){    
    this->stop();
}

void io::IsUserHome_Runnable::runnable(const boost::system::error_code& err, boost::asio::steady_timer* t, boost::function<void(void)> callback, std::chrono::seconds interval){
    
    // Create an interruption point for the thread. That is, when thread.interrupt() is called this throws a boost::thread_interrupted error which is caught by IsUserHome_Runnable::thread_runner.
    boost::this_thread::interruption_point();

    // Run the callback
    callback();

    // Extend the timer -> this gives us the periodic nature of this thread.
    t->expires_at(t->expires_at() + interval);

    // Re-run the async_wait.
    t->async_wait(boost::bind(io::IsUserHome_Runnable::runnable, boost::asio::placeholders::error, t, callback, interval));
}

void io::IsUserHome_Runnable::thread_runner(void){
    boost::asio::io_context io_context;
    boost::function<void (void)> callback( boost::bind( &io::IsUserHome_Runnable::isUserHome, this, "192.168.0.42") );

    boost::asio::steady_timer timer(io_context,this->interval);
    timer.async_wait( 
        boost::bind(io::IsUserHome_Runnable::runnable,
        boost::asio::placeholders::error,
        &timer,
        callback,
        this->interval    
        ));

    try{
        callback();
        io_context.run();
    }catch(boost::thread_interrupted&){ //< Catch the boost thread interrupt
        std::cout << "Interrupted thread " << boost::this_thread::get_id() << std::endl;
        io_context.stop();
    }
}

void io::IsUserHome_Runnable::start(void){
    boost::function<void (void)> runner( boost::bind( &io::IsUserHome_Runnable::thread_runner, this) );
    this->thread_group.create_thread(runner);
}

void io::IsUserHome_Runnable::stop(void){
    this->thread_group.interrupt_all();
}

void io::IsUserHome_Runnable::attach(void){
    this->thread_group.join_all();
}

