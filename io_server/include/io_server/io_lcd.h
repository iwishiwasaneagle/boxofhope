#ifndef IO_LCD_H
#define IO_LCD_H

#include "wiringPi.h"
#include "wiringPiI2C.h"
#include "stdlib.h"
#include "stdio.h"

namespace io{

    class LCD_Runnable{
        private:

            #define I2C_address;
            int fd;
            
        public:

            #define LCD_CHAR
            #define LCD_CMD

            #define line_1
            #define line_2

            #define LCD_backlight
            #define LCD_enable

            void lcd_byte(int bits, int mode);
            void lcd_toggle_enable(int bits);
            void lcd_init();
            void lcd_write(const char *s, int line);
            void lcd_clear();

            void LCD_Runnable();
            void ~LCD_Runnable();
    };
}

#endif