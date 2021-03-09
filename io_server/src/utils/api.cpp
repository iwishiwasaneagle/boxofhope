#include "utils/api.h"

/*================*/
/*=== Core API ===*/
/*================*/

size_t API::cUrlWriteCallback(void *contents, size_t size, size_t nmemb, void *userp){ 
    ((std::string*)userp)->append((char*)contents, size * nmemb);
    return size * nmemb;
}

json API::operation(std::string method, std::string url, std::string port, std::string endpoint){
    return API::operation(method, url, port, endpoint, json::object());
}
json API::operation(std::string method, std::string url, std::string port, std::string endpoint, json body){
    return API::operation(method, url, port, endpoint, body, json::object());
}
json API::operation(std::string method, std::string url, std::string port, std::string endpoint, json body, json headers){
	CURL *curl;
	CURLcode res;
	curl = curl_easy_init();
	std::string responseBuffer;
	std::string headerBuffer;
	if(curl) {
      //curl_easy_setopt(curl, CURLOPT_VERBOSE, 1);
      //curl_easy_setopt(curl, CURLOPT_HEADER, 1);
	  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, method.c_str());
        
      // TODO Make this a CLI flag 
      curl_easy_setopt(curl, CURLOPT_PROXY, "127.0.0.1:8080");  

      // TODO Improve this. Currently very easy to break.
	  std::string path =  url+":"+port+endpoint;
	  curl_easy_setopt(curl, CURLOPT_URL, path.c_str() );

      // TODO Add headers
	  struct curl_slist *headers = NULL;
	  headers = curl_slist_append(headers, "Content-Type: application/json");
	  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
	  
      std::cout << body.dump().c_str() << std::endl; 
      const std::string payload = body.dump();
      curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, payload.length());
      curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());

      curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, API::cUrlWriteCallback);
      curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseBuffer);
      curl_easy_setopt(curl, CURLOPT_HEADERDATA, &headerBuffer);
	  
	  res = curl_easy_perform(curl);
        
      std::string body_delimiter = "\r\n\r\n";
      responseBuffer = responseBuffer.erase(0,responseBuffer.find(body_delimiter)+body_delimiter.length());

	}
	curl_easy_cleanup(curl);
    return json::parse(responseBuffer);
}

/*============*/
/*=== Home ===*/
/*============*/

json API::HomeState::set(bool isUserHome){
    return API::HomeState::update(isUserHome);
}

json API::HomeState::update(bool isUserHome){
    std::string state;
    switch(isUserHome){
        case true:
            state="User Home";
            break;
        case false:
            state="User Not Home";
            break;
    }
    json payload;
    payload["user_status"] = state;
    
    return API::operation("PUT",API_URL, API_PORT, "/state/user-home", payload);
}

json API::HomeState::get(void){
    return API::operation("GET",API_URL, API_PORT, "/state/user-home");
}

/*============*/
/*=== Mask ===*/
/*============*/

json API::MaskState::set(bool isMaskPresent){
    return API::MaskState::update(isMaskPresent);
}

json API::MaskState::update(bool isMaskPresent){
    std::string state;
    switch(isMaskPresent){
        case true:
            state="Mask Present";
            break;
        case false:
            state="No Mask Present";
            break;
    }
    json payload;
    payload["mask_status"] = state;
    
    return API::operation("PUT",API_URL, API_PORT, "/state/present-mask", payload);
}

json API::MaskState::get(void){
    return API::operation("GET",API_URL, API_PORT, "/state/present-mask");
}


/*===========*/
/*=== UVC ===*/
/*===========*/

json API::UVCState::set(int sterilizationTime){
    return API::UVCState::update(sterilizationTime);
}

json API::UVCState::update(int sterilizationTime){
    json payload;
    payload["mask_status"] = std::to_string(sterilizationTime);
    
    return API::operation("PUT",API_URL, API_PORT, "/state/UVC", payload);
}

json API::UVCState::get(void){
    return API::operation("GET",API_URL, API_PORT, "/state/UVC/last");
}
