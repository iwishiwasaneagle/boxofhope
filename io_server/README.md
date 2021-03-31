# BoxOfHope io_server

## Build

The `wiringPi` dependecy only runs on Raspberry Pi, therefore if you're building this on a non-RPi platform, please install [wiringPi-mock](https://github.com/iwishiwasaneagle/wiringPi-mock). Otherwise, please install [wiringPi](https://github.com/iwishiwasaneagle/wiringPi) from `iwishiwasaneagle` until [wiringPi#102](https://github.com/WiringPi/WiringPi/pull/102) is closed.. 

```bash
sudo apt-get install gcc cmake libboost-all-dev libnfc-dev # For ubuntu, use whatever package manager your system needs.

# io_server
git clone https://github.com/iwishiwasaneagle/boxofhope
cd io_server
cmake -S . -B build
cmake --build build
```

The `io_server` binary will be located in the automatically generated `build` folder.

## Run

`io_server` has the following flags 
```bash
Welcome to IO_server (v1.2.0)

Usage:
   -h,--help                Print this message
   -t                       Run tests
   -r                       Run io_server
   -P,--proxy <ip>:<port>   HTTP proxy address
   -A,--api   <ip>:<port>   API address
   -U,--user  <ip>          Home device - the device used to check if the user is home
```

An example usage of this would be 
```bash
sudo ./build/io_server -r --api http://<API_IP:API_PORT> --user <DEVICE_IP> --proxy http://<PROXY_IP>:<PROXY_PORT>
```
