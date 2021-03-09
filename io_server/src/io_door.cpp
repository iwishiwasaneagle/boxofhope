#include <io_server/io_door.h>

unsigned int io::Door_Helper::blocking_wait_for_door(unsigned int time_ms){
    int t0;
    t0 = millis();

    if(waitForInterrupt(DOOR_SWITCH_PIN_WP, time_ms, INT_EDGE_BOTH)==0){
        return 0;
    }; 
    
    return millis()-t0; 
}

bool io::Door_Helper::door_state(void){
    const int debounceAvgCount = 10; //< The amount of times to sample the door before making a decision on the state.
    unsigned const int debounceDelay = 20; //< The time between samples. Increase if the output flickers.
        
    // Debounce the switch by checking average input 
    // -> low = 0, high = 1, so we need avg inp > 0.5 to consider door closed
    int count = 0;
    for(int i=0;i<debounceAvgCount;i++){
        count += digitalRead(DOOR_SWITCH_PIN_WP);
        delay(debounceDelay);
    }
    float mean = float(count)/debounceAvgCount;
    
    return mean>0.5;
} 
