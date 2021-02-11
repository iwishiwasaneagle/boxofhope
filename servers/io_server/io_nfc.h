#ifndef IO_NFC_H
#define IO_NFC_H

#include <iostream>
#include <nfc/nfc.h>

namespace io{

	class NFC_Runnable{
        private:
		    nfc_device* reader;
		    nfc_context* context;

		    const uint8_t pollCount = 20; //< specifies the number of polling (0x01 – 0xFE: 1 up to 254 polling, 0xFF: Endless polling) 
		    const uint8_t pollPeriod = 2; //< indicates the polling period in units of 150 ms (0x01 – 0x0F: 150ms – 2.25s) 
		    const nfc_modulation nmModulations[6] = {
         		{ .nmt = NMT_ISO14443A, .nbr = NBR_106 },
         		{ .nmt = NMT_ISO14443B, .nbr = NBR_106 },
         		{ .nmt = NMT_FELICA, .nbr = NBR_212 },
         		{ .nmt = NMT_FELICA, .nbr = NBR_424 },
	     		{ .nmt = NMT_JEWEL, .nbr = NBR_106 },
	    	 	{ .nmt = NMT_ISO14443BICLASS, .nbr = NBR_106 },
  			}; //< desired modulations 
	        const size_t szModulations = 6;	//< size of nmModulations
        public:
            NFC_Runnable(void);
            ~NFC_Runnable(void);
            nfc_target waitForTag(void);
	};

}
#endif
