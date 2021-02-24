#include <nlohmann/json.hpp>
#include <fstream> 
#include <iostream>
#include <regex>

/// <a href="https://github.com/nlohmann/json"> nlohmann's json library </a> which is automatically pulled into the project by CMake.
using json = nlohmann::json;

/** 
 * Encloses the full life-cycle of the IO server.
 * 
 * IO server namespace. Ensures that if the restful_server.h is imported, the same-named functions/class/etc. don't interact.
 */
namespace io{

;

    class Config{
            std::string api_port = "";
            std::string api_url  = "";
        public:
            /** 
             * \brief An enum to define the return state of fetching a config value
             */
            enum CONFIG_RETURN_STATE {
                OK=1, /**< Value found */
                NOT_FOUND=404, /**< Value not found */
                INVALID_VALUE=400 /**< Invalid input */
            };
            
            /**
             * \brief A struct to bundle a return value and state code from ::io::Config getters such as ::io::Config::get_api_url
             * \struct ConfigReturn
             * \var ConfigReturn::value
             * \var ConfigReturn::return_state
             */
            struct ConfigReturn {
                std::string value; //< Return value. void if return_state is ::io::Config::CONFIG_RETURN_STATE::NOT_FOUND
                CONFIG_RETURN_STATE return_state = CONFIG_RETURN_STATE::OK; //< Return state: default to OK
            };

            /**
             * \brief Get the api url value
             * 
             * \return ConfigReturn 
             */
            ConfigReturn get_api_url();

            /** 
             * \brief Set the api url value
             * 
             * \param api_url The API URL string
             * \return ConfigReturn
             */
            CONFIG_RETURN_STATE set_api_url(std::string api_url);

            /**
             * \brief Get the api port object
             * 
             * \return ConfigReturn 
             */
            ConfigReturn get_api_port();
            
            /** 
             * \brief Set the api port value
             * 
             * \param api_url The API port string
             * \return ConfigReturn
             */
            CONFIG_RETURN_STATE set_api_port(std::string api_port);
            
            /**
             * \brief Constructor taking a std::ifstream file as an input.
             *
             * \param file Input file 
             *
             */
            Config(std::ifstream &file);
            
            /**
             * \brief Constructor taking a json std::string as an input.
             *
             * \param input JSON parseable string 
             *
             */
            Config(std::string input);

            /**
             * \brief Creates a empty config class. 
             *
             */
            Config(void);
            ~Config(void);    
    };

}

