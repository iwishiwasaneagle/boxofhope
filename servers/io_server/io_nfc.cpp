#include "io_nfc.h"

io::NFC_Runnable::NFC_Runnable(void){
    nfc_init(&(this->context)); // Set up LibNFC context

    /* LibNFC error checking whilst setting up env */
    if(this->context == NULL){
        std::cerr << "Unable to init libnfc (malloc)" << std::endl;
        exit(EXIT_FAILURE);
    }

    std::cout << "libnfc version: " << nfc_version() << std::endl;
    
    this->reader = nfc_open(this->context, NULL);

    if(this->reader==NULL){
        std::cerr << "ERROR: Unable to open NFC device." << std::endl;
        exit(EXIT_FAILURE);
    }

    if(nfc_initiator_init(this->reader)<0){
        nfc_perror(this->reader, "nfc_initiator_init");
        exit(EXIT_FAILURE);
    }

    std::cout << "NFC Reader " << nfc_device_get_name(this->reader) << " opened" << std::endl;
}

io::NFC_Runnable::~NFC_Runnable(void){
    nfc_close(this->reader); // Close reader (nfc_device)
    nfc_exit(this->context); // Close LibNFC context (nfc_context)
}

nfc_target io::NFC_Runnable::waitForTag(void){
    nfc_target tag;

	std::cout << "NFC device will poll during " 
		<< (unsigned long) this->pollCount * this->szModulations * this->pollPeriod * 150 
		<< " ms ("
		<< this->pollCount
		<<" pollings of "
		<< (unsigned long) this->pollPeriod * 150
		<< " ms for %" 
		<< this->szModulations
		<<  " modulations)" << std::endl;
	int res = 0;
	if ((res = nfc_initiator_poll_target(
						this->reader, 
						this->nmModulations, 
						this->szModulations,
						this->pollCount,
						this->pollPeriod,
						&tag))  < 0) {

    	nfc_perror(this->reader, "nfc_initiator_poll_target");
    	nfc_close(this->reader);
    	nfc_exit(this->context);
    	exit(EXIT_FAILURE);

  	}

    // Result if res not negative
    if (res > 0) {
  		char* tagStr;
  		str_nfc_target(&tagStr, &tag, true);
        std::cout << tagStr << std::endl;
  		while (0 == nfc_initiator_target_is_present(this->reader, NULL)) {}
      	nfc_perror(this->reader, "nfc_initiator_target_is_present");
      	std::cout<< "done." << std::endl;
    } else {
      	std::cerr << "No target found." << std::endl;
    }

    /// Return the single nfc_target (i.e. the tag)
    return tag;
}

