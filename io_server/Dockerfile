FROM balenalib/armv7hf-ubuntu:latest
 

ENV UDEV=1
RUN install_packages wget git make g++ libboost-thread-dev libboost-system-dev libboost-test-dev libnfc-dev libcurl4 libcurl4-openssl-dev

WORKDIR /opt
RUN wget https://github.com/Kitware/CMake/releases/download/v3.19.3/cmake-3.19.3.tar.gz -q
RUN rm -rf cmake-3.19.3 \
    && tar -xzf cmake-3.19.3.tar.gz \
    && cd cmake-3.19.3 \
    && ./bootstrap \
    && make -j$(nproc) \
    && make install \
    && cmake --version

RUN git clone https://github.com/iwishiwasaneagle/wiringPi \
    && cd wiringPi \
    && ./build \
    && ldconfig

WORKDIR /usr/src/app/io_server
COPY . /usr/src/app/io_server
RUN ls -la
RUN cmake . \
    && cmake --build build -j $(nproc)
    
CMD ["sudo", "./io_server", "-r", "--api", "http://api:3001", "--user 192.168.0.40"]
