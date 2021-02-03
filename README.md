<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://boxofhope.co.uk/">
    <img src="https://raw.githubusercontent.com/iwishiwasaneagle/boxofhope/main/images/logo.png" alt="Logo" height="160">
  </a>

  <h2 align="center">Box Of Hope</h2>  
  
  <p align="center">
    Event driven COVID-19 safety
    <br />
    <a href="https://boxofhope.co.uk/docs/index.html"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://www.boxofhope.co.uk">View Demo</a>
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
[![License](https://img.shields.io/github/license/iwishiwasaneagle/boxofhope.svg?style=for-the-badge)](https://github.com/iwishiwasaneagle/boxofhope/blob/master/LICENSE.txt)
</div>
<div align="center">

![Servers](https://github.com/iwishiwasaneagle/boxofhope/workflows/Servers/badge.svg)
![Docs](https://github.com/iwishiwasaneagle/boxofhope/workflows/Docs/badge.svg)
</div>
<br />

<!-- TABLE OF CONTENTS -->
## Table of contents
<ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
</ol>



<!-- ABOUT THE PROJECT -->
## About The Project

Box of hope was created to solve the unique, and very annoying, scenario of  

> Where's my mask? Oh I left it at home... again...

As part of a university, the creators were tasked with creating a event driven codebase that interacts with a user and low level components on a Raspberry Pi.



<!-- GETTING STARTED -->
## Getting Started

There are 3 servers as part of the [`servers`](./servers) folder: sql, io, restful.

First, the project needs to be built. Run the following to build the project.

```bash
git clone https://github.com/iwishiwasaneagle/boxofhope
cd serves
cmake .
make
```

The `Boxofhope` binary will be located in the automatically generated `build` folder.

To use either of the three servers, invoke the binary with `--sql-server`, `--io-server`, `--restful-server` along with the desired server specific configurations.




<!-- USAGE EXAMPLES -->
## Usage

```bash
(boxofhope/servers) $ ./build/Boxofhope
Welcome to Boxofhope (v0.0.1)

Usage:
   --sql-server       Start the SQL server instance
   --restful-server   Start the RESTful server instance
   --io-server        Start the IO server instance
```

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

Jan-Hendrik Ewers - [@jhewers](https://twitter.com/jhewers)

Sarah Swinton - [@SarahESwinton](https://twitter.com/SarahESwinton)

Martin Karel - [@13Darcer](https://twitter.com/13Darcer)

Project Link: [https://github.com/iwishiwasaneagle/boxofhope](https://github.com/iwishiwasaneagle/boxofhope)
