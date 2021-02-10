#include "wiringPi.h"
#include "version.h"

void wiringPiVersion (int *major, int *minor)
{
    *major = VERSION_MAJOR ;
    *minor = VERSION_MINOR ;
}
