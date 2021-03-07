#ifndef UTILS_API_H
#define UTILS_API_H

#include <string>
#include <ostream>
#include <istream>
#include <iostream>
#include <curl/curl.h>

#include <nlohmann/json.hpp>

#define API_URL "jheraspi.local"
#define API_PORT "3000"


/**
 *  \brief [Nlohmann's JSON library](https://github.com/nlohmann/json/)
 */
using json = nlohmann::json;

class API{
    private:
        /**
         * \brief Callback for cURL [CURLOPT_WRITEFUNCTION](https://curl.se/libcurl/c/CURLOPT_WRITEFUNCTION.html)
         *
         * \param in contents Points to the delivered data
         * \param in size Always 1
         * \param in nmemb Size of the data
         * \param out userp A data pointer to pass to the write callback. A pointer for this is passed to [CURLOPT_WRITEDATA](https://curl.se/libcurl/c/CURLOPT_WRITEDATA.html)
         *
         * \return The number of bytes actually taken care of. If that amount differs from the amount passed to your callback function, it'll signal an error condition to libcurl.
         */
		static size_t cUrlWriteCallback(void *contents, size_t size, size_t nmemb, void *userp);


        /**
         * \brief Generic static function for ::API members to use for running HTTP requests.
         *
         * \param method The HTTP method to use (GET, POST, etc)
         * \param url API URL
         * \param port API port
         * \param endpoint API endpoint beginning with a '/'
         * \param body Request body as a ::json object
         * \param headers Request headers as a ::json object
         *
         * \return ::json object holding the request message 
         */
        static json operation(std::string method, std::string url, std::string port, std::string endpoint, json body, json headers);

        /**
         * \brief Generic static function for ::API members to use for running HTTP requests.
         *
         * Passes a empty header ::json object to ::API::operation(std::string, std::string, std::string, std::string, json, json).
         *
         * \param method The HTTP method to use (GET, POST, etc)
         * \param url API URL
         * \param port API port
         * \param endpoint API endpoint beginning with a '/'
         * \param body Request body as a ::json object
         *
         * \return ::json object holding the request message 
         */
        static json operation(std::string method, std::string url, std::string port, std::string endpoint, json body);
        
        /**
         * \brief Generic static function for ::API members to use for running HTTP requests.
         *
         * Passes a empty ibody ::json object to ::API::operation(std::string, std::string, std::string, std::string, json).
         *
         * \param method The HTTP method to use (GET, POST, etc)
         * \param url API URL
         * \param port API port
         * \param endpoint API endpoint beginning with a '/'
         *
         * \return ::json object holding the request message 
         */
        static json operation(std::string method, std::string url, std::string port, std::string endpoint);
    public:
        /**
         * \brief Static class to access the /state/user-home endpoint
         */
        class HomeState {
			public:
                /**
                 * \brief Update the state
                 *
                 * \param isUserHome Is user home?
                 *
                 * \return ::json object with message data
                 */
	            static json update(bool isUserHome);        
                /**
                 * \brief Set the initial state
                 *
                 * \param isUserHome Is user home?
                 *
                 * \return ::json object with message data
                 */
                static json set(bool isUserHome);
        };
        /**
         * \brief Static class to access the /state/present-mask endpoint
         */
        class MaskState {
			public:
                /**
                 * \brief Update the state
                 *
                 * \param isMaskPresent Is mask present?
                 *
                 * \return ::json object with message data
                 */
	            static json update(bool isMaskPresent);        
                /**
                 * \brief Set the initial state
                 *
                 * \param isMaskPresent Is mask present?
                 *
                 * \return ::json object with message data
                 */
                static json set(bool isMaskPresent);
                /**
                 * \brief Get the state
                 *
                 * \return ::json object with message data
                 */
                static json get(void);
        };
};
#endif
