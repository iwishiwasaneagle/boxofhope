#include <io_server/io_server.h>

volatile bool isDoorOpen; //< Door open or closed boolean variable. Edited by door_switch_interrupt.
volatile bool isInterruptRunning; //< Is the interrupt running? Prevents multiple interrupts from running due to bounce. 
const int debounceAvgCount = 10; //< The amount of times to sample the door before making a decision on the state.
unsigned const int debounceDelay = 20; //< The time between samples. Increase if the output flickers.

void io::door_switch_interrupt(void){
    if(isInterruptRunning){
        isInterruptRunning = false;
    }

    if(!isInterruptRunning){
    
        isInterruptRunning = true;
    
        /// Debounce the switch by checking average input 
        /// -> low = 0, high = 1, so we need avg inp > 0.5 to consider door closed
        int count = 0;
        for(int i=0;i<debounceAvgCount;i++){
            count += digitalRead(DOOR_SWITCH_PIN_WP);
            delay(debounceDelay);
        }
        float mean = float(count)/debounceAvgCount;
        if(mean>=0.5){
            isDoorOpen = true;
        }else{
            isDoorOpen = false;
        }
        isInterruptRunning = false;
    }
}
