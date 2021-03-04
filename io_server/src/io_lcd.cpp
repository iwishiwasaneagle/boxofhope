// THIS IS FOR MARTIN

/*
*
* Some low-level display functions insipred by Lewis Loflin
* www.bristolwatch.com lewis@bvu.net
* http://www.bristolwatch.com/rpi/i2clcd.htm
* Using wiringPi by Gordon Henderson
*
*
* Port over lcd_i2c.py to C and added improvements.
* Supports 16x2 and 20x4 screens.
*
*/

#include <io_server/io_lcd.h>

#define I2C_address 0x3f    // I2C display address
#define LCD_CHR 1           // Dsiplay mode - sending data
#define LCD_CMD 0           // Display mode - sending command 

#define line_1 0x80         // 1st line (position)
#define line_2 0xC0         // 2nd line (position)

#define LCD_backlight 0x08  // LCD backlight (0x08 = on; 0x00 = off)

#define LCD_enable 0b00000100 // Enable bit

/**
 * \brief Function for sending bytes of data
 * \param bits Data (bits)
 * \param mode LCD mode (1 = data; 0 = command)
*/
void io::LCD_Runnable::lcd_byte(int bits, int mode) {
  //Send byte to data pins
  // bits = the data
  // mode = 1 for data, 0 for command
  int bits_high;
  int bits_low;

  // uses the two half byte writes to LCD
  bits_high = mode | (bits & 0xF0) | LCD_backlight ;
  bits_low = mode | ((bits << 4) & 0xF0) | LCD_backlight ;

  // High bits
  wiringPiI2CReadReg8(fd, bits_high);
  io::LCD_Runnable::lcd_toggle_enable(bits_high);

  // Low bits
  wiringPiI2CReadReg8(fd, bits_low);
  io::LCD_Runnable::lcd_toggle_enable(bits_low);
}

/**
 * \brief LCD toggle enable function
 * \param bits Data (bits)
*/
void io::LCD_Runnable::lcd_toggle_enable(int bits) {
    // Toggle enable pin on LCD display
    delayMicroseconds(500);
    wiringPiI2CReadReg8(fd, (bits | LCD_enable));
    delayMicroseconds(500);
    wiringPiI2CReadReg8(fd, (bits & ~LCD_enable));
    delayMicroseconds(500);
}

/**
 * \brief LCD initialisation function 
*/
void io::LCD_Runnable::lcd_init() {
  // Initialise display
  io::LCD_Runnable::lcd_byte(0x33, LCD_CMD); // Initialise
  io::LCD_Runnable::lcd_byte(0x32, LCD_CMD); // Initialise
  io::LCD_Runnable::lcd_byte(0x06, LCD_CMD); // Cursor move direction
  io::LCD_Runnable::lcd_byte(0x0C, LCD_CMD); // 0x0F On, Blink Off
  io::LCD_Runnable::lcd_byte(0x28, LCD_CMD); // Data length, number of lines, font size
  io::LCD_Runnable::lcd_byte(0x01, LCD_CMD); // Clear display
  delayMicroseconds(500);
}

/**
 * \brief Writing characters to the LCD
 * \param *s Pointer to a given character
 * \param line Line number (line_1 = 0x80 or line_2 = 0xC0)
*/
void io::LCD_Runnable::lcd_write(const char *s, int line) {

    // choose line (cursor position)
    io::LCD_Runnable::lcd_byte(line, LCD_CMD);

    // outputting the string, character by character:
    while (*s) io::LCD_Runnable::lcd_byte(*(s++)), LCD_CHR);

}

/**
 * \brief Funciton for clearing the LCD
*/
void io::LCD_Runnable::lcd_clear() {

    io::LCD_Runnable::lcd_byte(0x01, LCD_CMD);
    io::LCD_Runnable::lcd_byte(0x02, LCD_CMD);

}

/**
 * \brief Construct a new io::LCD Runnable::LCD Runnable object
 * 
 */
io::LCD_Runnable::LCD_Runnable(void){

    // LCD initialisation process (fucntion)
    io::LCD_Runnable::lcd_init();

}

/**
 * \brief Destroy the io::LCD Runnable::LCD Runnable object
 * 
 */
io::LCD_Runnable::~LCD_Runnable(void){

}