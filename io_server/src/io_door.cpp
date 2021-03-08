#include <io_server/io_door.h>

volatile bool isDoorOpen; //< Door open or closed boolean variable. Edited by door_switch_interrupt.
volatile bool isInterruptRunning; //< Is the interrupt running? Prevents multiple interrupts from running due to bounce. 
const int debounceAvgCount = 10; //< The amount of times to sample the door before making a decision on the state.
unsigned const int debounceDelay = 20; //< The time between samples. Increase if the output flickers.



unsigned int io::Door_Helper::blocking_wait_for_door(unsigned int time_ms){
    int t0;
    t0 = millis();

    if(waitForInterrupt(DOOR_SWITCH_PIN_WP, time_ms, INT_EDGE_BOTH)==0){
        return 0;
    }; 
    
    return millis()-t0; 
}
