#ifndef IO_LCD_H
#define IO_LCD_H

#include "wiringPi.h"

namespace io{

    class LCD_Runnable{
        private:

            int address; 
            
        public:
            void LCD_Runnable();
            void ~LCD_Runnable();
    };
}

#endif