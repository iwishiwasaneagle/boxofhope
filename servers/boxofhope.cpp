#include <iostream>
#include <string>
#include "boxofhopeConfig.h"

const std::string USAGE = 
std::string("Welcome to ")+ std::string(Boxofhope_PROJECT_NAME) + std::string(" CLI!\n"
"\n"
"Usage:\n"
"   --sql-server       Start the SQL server instance\n"
"   --restful-server   Start the RESTful server instance\n"
"   --io-server        Start the IO server instance\n");


int main(int argc, char* argv[]){
  if (argc < 2) {
    // report version
    std::cout << argv[0] << " Version " << Boxofhope_VERSION_MAJOR << "."
              << Boxofhope_VERSION_MINOR << "." << Boxofhope_VERSION_PATCH
              << std::endl <<std::endl;
    std::cout << USAGE << std::endl;
    return 1;
  }
}

