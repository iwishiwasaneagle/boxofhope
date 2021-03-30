#include "utils/api.h"

/*================*/
/*=== Core API ===*/
/*================*/

size_t API::cUrlWriteCallback(void *contents, size_t size, size_t nmemb,
                              void *userp) {
    ((std::string *)userp)->append((char *)contents, size * nmemb);
    return size * nmemb;
}

json API::operation(std::string method, std::string endpoint) {
    return API::operation(method, endpoint, json::object());
}
json API::operation(std::string method, std::string endpoint, json body) {
    return API::operation(method, endpoint, body, json::object());
}
json API::operation(std::string method, std::string endpoint, json body,
                    json headers) {
    CURL *curl;
    CURLcode res;
    curl = curl_easy_init();
    std::string responseBuffer;
    std::string headerBuffer;
    if (curl) {
        // curl_easy_setopt(curl, CURLOPT_VERBOSE, 1);
        // curl_easy_setopt(curl, CURLOPT_HEADER, 1);
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, method.c_str());

        if (!PROXY_URL.empty()) {
            res = curl_easy_setopt(curl, CURLOPT_PROXY, PROXY_URL.c_str());
            if(API_DEBUG || res!=CURLE_OK){
                std::cout << "\033[1;45mAPI Util\033[0m\tProxy set to " << PROXY_URL
                          << " | Res = " << res << " | " << curl_easy_strerror(res)
                          << std::endl;
            }
        }

        // TODO Improve this. Currently very easy to break.
        std::string path = API_URL + endpoint;
        curl_easy_setopt(curl, CURLOPT_URL, path.c_str());

        struct curl_slist *cHeaders = NULL;
        std::stringstream tempHeader;
        for ( auto& it : headers.items() ){
            tempHeader << it.key() << ": ";
            // nlohmann::json is really weird that the it.key() returns a std::string, 
            // but it.value() returns a nlohmann::basic_json object. So in order to get the value of a string WITHOUT
            // quotes, you have to cast it to a string. However if it's NOT a string (like an int for exampl), it'll throw the json::exception with 
            // id = 302.
            try{
                std::string valStr = headers[it.key()];
                tempHeader << valStr;
            }catch(json::exception&  e ){
                if (e.id == 302){
                    tempHeader << it.value();
                }else{
                    throw e;
                }
            }
            cHeaders = curl_slist_append(cHeaders, tempHeader.str().c_str());
            tempHeader.str(""); // clear the std::stringstream
        }
        cHeaders = curl_slist_append(cHeaders, "Content-Type: application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, cHeaders);

        const std::string payload = body.dump();
        curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, payload.length());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());

        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, API::cUrlWriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseBuffer);
        curl_easy_setopt(curl, CURLOPT_HEADERDATA, &headerBuffer);

        res = curl_easy_perform(curl);
        if(API_DEBUG || res!=CURLE_OK){
            std::cout << "\033[1;45mAPI Util\033[0m\tCall to " << path
                      << " | Res = " << res << " | " << curl_easy_strerror(res)
                      << std::endl;
        }
        if (res != CURLE_OK) {
            return NULL;
        }

        // std::string body_delimiter = "\r\n\r\n";
        // responseBuffer =
        // responseBuffer.erase(0,responseBuffer.find(body_delimiter)+body_delimiter.length());
        // // This was working but now it doesn't... seems like libcurl has
        // started cutting the reponse down???
    }
    curl_easy_cleanup(curl);
    json jsonReturnValue = json::parse(responseBuffer);
    return jsonReturnValue;
}

/*============*/
/*=== Home ===*/
/*============*/

bool API::HomeState::set(bool isUserHome) {
    return  API::HomeState::update(isUserHome);
}

bool API::HomeState::update(bool isUserHome) {
    std::string state;
    switch (isUserHome) {
    case true:
        state = "User Home";
        break;
    case false:
        state = "User Not Home";
        break;
    }
    json payload;
    payload["user_status"] = state;

    API::operation("POST", "/userHome/user-status", payload);
    return isUserHome;
}

bool API::HomeState::get(void) {
    throw std::runtime_error("Not implemented yet.");  
}

/*============*/
/*=== Mask ===*/
/*============*/

bool API::MaskState::set(bool isMaskPresent) {
    return API::MaskState::update(isMaskPresent);
}

bool API::MaskState::update(bool isMaskPresent) {
    std::string state;
    switch (isMaskPresent) {
    case true:
        state = "on";
        break;
    case false:
        state = "off";
        break;
    }
    json payload;
    payload["state"] = state;
    payload["keyword"] = "mask";

    API::operation("POST", "/state/register-new", payload);
    return isMaskPresent;
}

bool API::MaskState::get(void) {
    json res = API::operation("GET", "/state/mask/latest");
    if(res["state"]=="on"){
            return true;
    }else{
            return false;
    }
}

/*===========*/
/*=== UVC ===*/
/*===========*/

int API::UVCState::set(int sterilizationTime) {
    return API::UVCState::update(sterilizationTime);
}

int API::UVCState::update(int sterilizationTime) {
    json payload;
    payload["state"] = "on";//std::to_string(sterilizationTime);
    payload["keyword"] = "uvc";

    API::operation("POST", "/state/register-new", payload);
    return sterilizationTime;
}

int API::UVCState::get(void) {
    json res = API::operation("GET", "/state/uvc/latest");
    
    if (res.empty()){
        return INT_MAX;
    }

    std::string s = res[0]["createdAt"];
    std::tm t{};
    std::istringstream ss(s);

    ss >> std::get_time(&t, "%Y-%m-%dT%TZ");
    
    std::time_t curtime = std::time(0);

    long long nsecs = std::difftime(curtime, std::mktime(&t));
	
	return nsecs;
}


/*============*/
/*=== Door ===*/
/*============*/

bool API::DoorState::set(bool isDoorOpen) {
	return API::DoorState::update(isDoorOpen);
}

bool API::DoorState::update(bool isDoorOpen) {
	std::string state;
	switch (isDoorOpen) {
	case true:
		state = "open";
		break;
	case false:
		state = "close";
		break;
	}
	json payload;
	payload["state"] = state;
	payload["keyword"] = "door";
	API::operation("POST", "/state/register-new", payload);
    return isDoorOpen;
}

bool API::DoorState::get(void) {
	json res = API::operation("GET", "/state/door/latest");
	if(res["state"]=="open"){
		return true;
    }else{
		return false;
	}
}

