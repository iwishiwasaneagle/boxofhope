# BoxOfHope io_server

**To build `io_server`:**

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