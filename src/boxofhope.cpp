#include <iostream>
#include <boxofhopeConfig.h>


int main(int argc, char* argv[]){
  if (argc < 2) {
    // report version
    std::cout << argv[0] << " Version " << Boxofhope_VERSION_MAJOR << "."
              << Boxofhope_VERSION_MINOR << std::endl;
    std::cout << "Usage: " << argv[0] << " number" << std::endl;
    return 1;
  }
}

