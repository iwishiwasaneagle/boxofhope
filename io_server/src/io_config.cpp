#include <io_server/io_config.h>


io::Config::Config(void){
    this->config = json::object();
}

io::Config::Config(std::ifstream file){
    this->config = json::parse(file);
}

io::Config::Config(std::string input){
    this->config = json::parse(input);
}

io::Config::~Config(void){}
