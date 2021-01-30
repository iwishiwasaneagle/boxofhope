#include <iostream>
#include <string>
#include "boxofhopeConfig.h"
#include "io_server.h"
#include "sql_server.h"
#include "restful_server.h"


static void show_usage(){
        std::cerr << "Welcome to " << Boxofhope_PROJECT_NAME << " (v" << Boxofhope_VERSION_MAJOR << "."
                  << Boxofhope_VERSION_MINOR << "." << Boxofhope_VERSION_PATCH << ")" << std::endl << std::endl
                  << "Usage:" << std::endl
                  << "   --sql-server       Start the SQL server instance" << std::endl
                  << "   --restful-server   Start the RESTful server instance" << std::endl
                  << "   --io-server        Start the IO server instance" << std::endl;
}

int main(int argc, char* argv[]){
  if (argc < 2) {
    show_usage();
    return 1;
  } 
  
  for(int i=1; i<argc; ++i){
      std::string arg = argv[i];
      if((arg == "-h") || (arg=="--help")){
        show_usage();
        return 0;
      }else if(arg=="--sql-server"){
        return sql::server_run(argc, argv);        
      }else if(arg=="--restful-server"){
        return restful::server_run(argc, argv);
      }else if(arg=="--io-server"){
        return io::server_run(argc, argv);
      }else{
        std::cerr<<"Incorrect usage: "<<arg<<std::endl;
        show_usage();
        return 1;
      }

  }
  
}

