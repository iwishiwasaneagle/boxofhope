// THIS IS FOR MARTIN

#include <io_server/io_lcd.h>

void io::LCD_Runnable::lcd_byte(int bits, int line) {

}

void io::LCD_Runnable::lcd_toggle_enable(int bits) {

}

// Writing to the LCD
void io::LCD_Runnable::lcd_write(const char *s, int line) {

    // choose line (cursor position)
    lcd_byte(line, LCD_CMD);

    // outputting the string, character by character:
    while (*s) lcd_byte(*(s++)), LCD_CHR);

}

void io::LCD_Runnable::lcd_clear() {

    lcd_byte(0x01, LCD_CMD);
    lcd_byte(0x02, LCD_CMD);

}

/**
 * \brief Construct a new io::LCD Runnable::LCD Runnable object
 * 
 */
io::LCD_Runnable::LCD_Runnable(void){

    #define I2C_address 0x3f    // I2C display address
    #define LCD_CHR 1           // Dsiplay mode - sending data
    #define LCD_CMD 0           // Display mode - sending command 

    #define line_1 0x80         // 1st line (position)
    #define line_2 0xC0         // 2nd line (position)

    #define LCD_backlight 0x08  // LCD backlight (0x08 = on; 0x00 = off)

    // LCD initialisation process (fucntion)
    // ...

}

/**
 * \brief Destroy the io::LCD Runnable::LCD Runnable object
 * 
 */
io::LCD_Runnable::~LCD_Runnable(void){

}