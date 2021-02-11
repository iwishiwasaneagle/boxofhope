#include "wiringPi.h"
#include "version.h"

struct timespec wiring_pi_setup_time;

void wiringPiVersion (int *major, int *minor)
{
    *major = VERSION_MAJOR ;
    *minor = VERSION_MINOR ;
}

int wiringPiSetup(void){
    clock_gettime(CLOCK_REALTIME, &wiring_pi_setup_time);
    return 0;
}

int wiringPiISR (int pin, int edgeType, void (*function)(void)){
    return 0;
}

int digitalRead(int pin){
    return LOW;
}

void pinMode(int pin, int mode){
}

void delay(unsigned int millis){
    usleep (millis*1000);
}
