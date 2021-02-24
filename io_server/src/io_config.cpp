#include <io_server/io_config.h>


io::Config::Config(void){
}

io::Config::Config(std::ifstream& file){
    json config = json::parse(file);
}

io::Config::Config(std::string input){
    json config = json::parse(input);
}

io::Config::~Config(void){}

io::Config::ConfigReturn io::Config::get_api_port(){
    io::Config::ConfigReturn return_value;
    if(this->api_port == ""){
        return_value.return_state = io::Config::CONFIG_RETURN_STATE::NOT_FOUND;
        return_value.value = "";
    }else{
        return_value.value = this->api_port;
    }
    return return_value;
}

io::Config::CONFIG_RETURN_STATE io::Config::set_api_port(std::string api_port){
    std::regex port_regex("^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$");

    if(std::regex_search(api_port, port_regex)){
        this->api_port = api_port;
        return io::Config::CONFIG_RETURN_STATE::OK;
    }
    return io::Config::CONFIG_RETURN_STATE::INVALID_VALUE;
}

io::Config::ConfigReturn io::Config::get_api_url(){
    io::Config::ConfigReturn return_value;
    if(this->api_url == ""){
        return_value.return_state = io::Config::CONFIG_RETURN_STATE::NOT_FOUND;
        return_value.value = "";
    }else{
        return_value.value = this->api_url;
    }
    return return_value;
}

io::Config::CONFIG_RETURN_STATE io::Config::set_api_url(std::string api_url){
    std::regex url_regex("^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$");

    if(std::regex_search(api_url, url_regex)){
        this->api_url = api_url;
        return io::Config::CONFIG_RETURN_STATE::OK;
    }
    return io::Config::CONFIG_RETURN_STATE::INVALID_VALUE;
}
