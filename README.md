<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/iwishiwasaneagle/boxofhope/">
    <img src="images/Gradient_Banner.png" alt="Logo" height="160">
  </a>

  <h2 align="center">Box Of Hope</h2>  
  
  <p align="center">
    Raspberry Pi COVID-19 DIY Project
    <br />
    <a href="https://github.com/iwishiwasaneagle/boxofhope/blob/main/Doxyfile"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/iwishiwasaneagle/boxofhope/wiki"><strong>Read the wiki »</strong></a>
    <br />
    <br />
    <a href="https://www.youtube.com/channel/UCG8txVUxQb3aCut7adeDU7A"><img height=40 src="images/youtube.svg"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://www.facebook.com/Box-of-Hope-106011608167716"><img height=40 src="images/facebook.svg"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://twitter.com/theboxofhope"><img height=40 src="images/twitter.svg"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://www.instagram.com/theboxofhope"><img height=40 src="images/instagram.svg"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="https://www.linkedin.com/company/theboxofhope"><img height=40 src="images/linkedin.svg"></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
    <br />
    <br />
    <a href="https://youtu.be/nG4Cgt_xKiQ">View Demo</a>
    ·
    <a href="https://github.com/iwishiwasaneagle/boxofhope/issues/new?assignees=&labels=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/iwishiwasaneagle/boxofhope/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
  </p>
</div>
<div align="center">
  
[![Contributors](https://img.shields.io/github/contributors/iwishiwasaneagle/boxofhope.svg?style=for-the-badge)](https://github.com/iwishiwasaneagle/boxofhope/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/iwishiwasaneagle/boxofhope.svg?style=for-the-badge)](https://github.com/iwishiwasaneagle/boxofhope/network/members)
[![Stars](https://img.shields.io/github/stars/iwishiwasaneagle/boxofhope.svg?style=for-the-badge)](https://github.com/iwishiwasaneagle/boxofhope/stargazers)
[![Issues](https://img.shields.io/github/issues/iwishiwasaneagle/boxofhope.svg?style=for-the-badge)](https://github.com/iwishiwasaneagle/boxofhope/issues)
[![License](https://img.shields.io/github/license/iwishiwasaneagle/boxofhope.svg?style=for-the-badge)](https://github.com/iwishiwasaneagle/boxofhope/blob/main/LICENSE)
</div>
<div align="center">

![Servers](https://github.com/iwishiwasaneagle/boxofhope/workflows/Servers/badge.svg)
![API](https://github.com/iwishiwasaneagle/boxofhope/actions/workflows/api_ci.yml/badge.svg)
![Docs](https://github.com/iwishiwasaneagle/boxofhope/workflows/Docs/badge.svg)
[![codecov](https://codecov.io/gh/iwishiwasaneagle/boxofhope/branch/main/graph/badge.svg?token=KQ8XKQ7CFM)](https://codecov.io/gh/iwishiwasaneagle/boxofhope)

</div>
<br />

<p align="center">
<a href="https://www.tomshardware.com/uk/news/raspberry-pi-uv-mask-sanitizer">🤯 <strong>As featured on tomshardware.co.uk</strong> 🤯</a>
<p align="center">
<!-- TABLE OF CONTENTS -->

## Table of contents

<ol>
    <li><a href="#project-motivation">Project Motivation</a></li>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
</ol>

<!-- PROJECT MOTIVATION -->

## Project Motivation

NOTE: This project has been started during the COVID-19 pandemic.

Considering the current government guidelines in the UK (and many other countries across the world) require people to wear reusable cloth face masks when in indoor shared spaces, they have become parts of our daily lives, but we still ocassionaly leave them behind or lose track when it's time to wash them. Hence, this project attempts to solve the annoying problem of:

> Where's my mask? Oh I left it at home... again...

Given this is a university project, the creators were tasked with creating a event driven codebase that interacts with a user and low level components on a Raspberry Pi.

A big part of this device is the user home state detection this is done by making the assumption that the user (being a techy person) will have this box a) at home and b) carries a mobile phone or some other **WiFi** enabled technology on them. Ergo, the user is home if the portable device's IPv4 address is on the same network.

<!-- ABOUT THE PROJECT -->

## About The Project
<div align="center">
  <img src="images/Components.png" alt="System Overview">
</div>

Box of Hope, as the name suggests, is a box to keep your face covering in while you are at home. 

It has disinfecting UV LEDs to remove any harmful bacteria and viruses which could have accumulated on your face mask while you were using it. These are activated each time a mask is returned into the box. 

To enable this, a switch needs to be installed by the door which senses whether the door is open or not. 

On the inside, the Raspberry Pi is equipped with an NFC top hat to read the NFC tag on the face mask. This enables the system to keep track of usage even if you have multiple masks. 

If your phone leaves your home's WiFi and a mask is still in the box, you will get a notification through a webapp, to remind to get your mask. The webapp also functions as the GUI for the system, showing real-time status of the key box parameters and hisotry over the last couple of hours. 

There are 3 components to this project: `api`, `webapp`, and `io_server`. More details about each can be found on the [official Wiki](https://github.com/iwishiwasaneagle/boxofhope/wiki/System-Overview). 

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/iwishiwasaneagle/boxofhope/issues?q=is%3Aopen+is%3Aissue+label%3Afeature) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

* Jan-Hendrik Ewers - Lead Programmer: [@jhewers](https://twitter.com/jhewers) 
* Sarah Swinton - Database & APIs: [@SarahESwinton](https://twitter.com/SarahESwinton)
* Martin Karel - Marketing & UX: [@13Darcer](https://twitter.com/13Darcer)

Project Link: [https://github.com/iwishiwasaneagle/boxofhope](https://github.com/iwishiwasaneagle/boxofhope)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgements

We would like to thank Dr Bernd Porr, Dr Nicholas Bailey, and all University of Glasgow RTEP5 teaching assistants for their support throughout the project. 
