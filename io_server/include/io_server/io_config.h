#include <nlohmann/json.hpp>
#include <iostream>
#include <fstream> 

/// <a href="https://github.com/nlohmann/json"> nlohmann's json library </a> which is automatically pulled into the project by CMake.
using json = nlohmann::json;

/** 
 * Encloses the full life-cycle of the IO server.
 * 
 * IO server namespace. Ensures that if the restful_server.h is imported, the same-named functions/class/etc. don't interact.
 */
namespace io{

    class Config{
            
        public:
            /// Quick Access to the config ::json
            json config;

            /**
             * \brief Constructor taking a std::ifstream file as an input.
             *
             * \param file Input file 
             *
             */
            Config(std::ifstream file);
            
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

