#include "wiringPi.h"
#include "version.h"

/** Copy wiringPi version function
 * \return Major and minor version code via pointers
 **/
void wiringPiVersion (int *major, int *minor)
{
    *major = VERSION_MAJOR ;
    *minor = VERSION_MINOR ;
}
