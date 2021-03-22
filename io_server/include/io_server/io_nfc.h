#ifndef IO_NFC_H
#define IO_NFC_H

#include <nfc/nfc.h>

/**
 * Encloses the full life-cycle of the IO server.
 *
 * IO server namespace. Ensures that if the restful_server.h is imported, the
 * same-named functions/class/etc. don't interact.
 */
namespace io {

/**
 *  NFC Runnable class that sets up LibNFC on construct, and safely
 *  destroys it on destruct.
 */
class NFC_Runnable : public GenericRunnable {
  private:
    nfc_device *reader;   //< The NFC reader struct
    nfc_context *context; //< The LibNFC context struct

    const uint8_t pollCount = 10; //< specifies the number of polling (0x01 – 0xFE: 1 up to 254
            //polling, 0xFF: Endless polling)
    const uint8_t pollPeriod = 1; //< indicates the polling period in units of
                                  //150 ms (0x01 – 0x0F: 150ms – 2.25s)
    const nfc_modulation nmModulations[5] = {
        {.nmt = NMT_ISO14443A, .nbr = NBR_106},
        {.nmt = NMT_ISO14443B, .nbr = NBR_106},
        {.nmt = NMT_FELICA, .nbr = NBR_212},
        {.nmt = NMT_FELICA, .nbr = NBR_424},
        {.nmt = NMT_JEWEL, .nbr = NBR_106},
        // 1.7.0 doesn't support this yet it seems	    	 	{ .nmt =
        // NMT_ISO14443BICLASS, .nbr = NBR_106 },
    };                              //< desired modulations
    const size_t szModulations = 5; //< size of nmModulations
  public:
    NFC_Runnable(void);  //< Constructor. Set up LibNFC.
    ~NFC_Runnable(void); //< Destructor. Tear down LibNFC as per documentation.

    /**
     *  waitForTag is a one-shot function to wait for a single NFC target and
     *retursn it
     *
     *  \return nfc_target struct from LibNFC
     *
     **/
    nfc_target waitForTag(void);
};

} // namespace io
#endif
