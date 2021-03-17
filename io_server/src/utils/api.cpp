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
            std::cout << "\033[1;45mAPI Util\033[0m\tProxy set to " << PROXY_URL
                      << " | Res = " << res << " | " << curl_easy_strerror(res)
                      << std::endl;
        }

        // TODO Improve this. Currently very easy to break.
        std::string path = API_URL + endpoint;
        curl_easy_setopt(curl, CURLOPT_URL, path.c_str());

        // TODO Add headers
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        const std::string payload = body.dump();
        curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, payload.length());
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, payload.c_str());

        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, API::cUrlWriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &responseBuffer);
        curl_easy_setopt(curl, CURLOPT_HEADERDATA, &headerBuffer);

        res = curl_easy_perform(curl);
        std::cout << "\033[1;45mAPI Util\033[0m\tCall to " << path
                  << " | Res = " << res << " | " << curl_easy_strerror(res)
                  << std::endl;
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
    return json::parse(responseBuffer);
}

/*============*/
/*=== Home ===*/
/*============*/

json API::HomeState::set(bool isUserHome) {
    return API::HomeState::update(isUserHome);
}

json API::HomeState::update(bool isUserHome) {
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

    return API::operation("POST", "/userHome/user-status", payload);
}

json API::HomeState::get(void) {
    return API::operation("GET", "/userHome/user-status");
}

/*============*/
/*=== Mask ===*/
/*============*/

json API::MaskState::set(bool isMaskPresent) {
    return API::MaskState::update(isMaskPresent);
}

json API::MaskState::update(bool isMaskPresent) {
    std::string state;
    switch (isMaskPresent) {
    case true:
        state = "Mask Present";
        break;
    case false:
        state = "No Mask Present";
        break;
    }
    json payload;
    payload["mask_status"] = state;

    return API::operation("PUT", "/state/present-mask", payload);
}

json API::MaskState::get(void) {
    return API::operation("GET", "/state/present-mask");
}

/*===========*/
/*=== UVC ===*/
/*===========*/

json API::UVCState::set(int sterilizationTime) {
    return API::UVCState::update(sterilizationTime);
}

json API::UVCState::update(int sterilizationTime) {
    json payload;
    payload["mask_status"] = std::to_string(sterilizationTime);

    return API::operation("PUT", "/state/UVC", payload);
}

json API::UVCState::get(void) {
    return API::operation("GET", "/state/UVC/last");
}
