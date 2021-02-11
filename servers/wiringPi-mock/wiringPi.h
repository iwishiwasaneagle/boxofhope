#ifndef WIRINGPI_MOCK
#define WIRINGPI_MOCK

#include "time.h"
#include "unistd.h"

#define INPUT 0
#define OUTPUT 1

#define LOW 0
#define HIGH 1

#define INT_EDGE_SETUP
#define INT_EDGE_FALLING 1
#define INT_EDGE RISING 2
#define INT_EDGE_BOTH 3

/**
 *  Get the wiringPi version via pointers
 */
void wiringPiVersion (int *major, int *minor);

/**
 * Delay function
 *
 * \param millis Time in milliseconds
 */
void delay(unsigned int millis);


/**
 * wiringPi setup function
 *
 * \return Exit code (always 0)
 */
int wiringPiSetup(void);

/**
 * Function to register Interrupt Service Routines (ISRs) on a specified pin.
 *
 * \param pin Pin number (wiringPi scheme).
 * \param edgeType INT_EDGE_FALLING, INT_EDGE_RISING, INT_EDGE_BOTH or INT_EDGE_SETUP. 
 * \param function Pointer to the interrupt function.
 * 
 * \return Exit code (always 0)
 */
int wiringPiISR (int pin, int edgeType,  void (*function)(void)) ;

/**
 * Read a pins digital value (LOW or HIGH).
 *
 * \param pin Pin number (wiringPi scheme).
 *
 * \return Digital read value (always LOW).
 */
int digitalRead(int pin);

/**
 * Set the pin mode
 *
 * \param pin Pin number (wiringPi scheme).
 * \param mode Mode of the pin - INPUT, OUTPUT, etc.
 */
void pinMode(int pin, int mode);

#endif
