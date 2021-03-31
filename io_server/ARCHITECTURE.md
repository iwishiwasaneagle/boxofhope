# Architecture

This document describes the high-level architecture of `boxofhope/io_server`.
If you want to familiarize yourself with the code base, you are just in the right place!

## Bird's Eye View

On the highest level, `boxofhope/io_server` is a thing which runs in the background and gathers data and handles business logic for the `boxofhope` eco-system.

It was created with the concept of event-driven logic in mind. However, some aspects of the codebase - such as `io_home` or `io_nfc` were impossible to implement in such a way. Therefore these use events and callbacks as much as possible.

## In-depth

In this section, all paths are relative to `boxofhope/io_server`.

### `./apps`

This houses the front-facing logic for `io_server`. Handles CLI flags via `getopts` and sets global variables as defined. Also allows running of a test function `tests` which isn't really tests.

### `./include/utils`

Here we hold the `API` utility worker. The directory is for any code that is useful across the whole project.

The `api.h` does what it says: interacts with the `boxofhope/api`.

### `./include/io_server`

All header files for the project are to be declared here and added manually to `CMakeLists.txt`. This allows an easy overview of what is happening within the system.

 - `io_server.h` houses the interactions between all the various runnables and enables one `run()` to be called from `apps/app.cpp` after all envs are set up.
 - `io_generic_runnable.h` hold the `io::GenericRunnable` virtual struct for other runnables to extend. Currently only acts as a template as each class redefines the `start`, `stop`, `attach`.
 - `io_door.h` holds 2 classes
   - `io::Door_Helper` hold static classes that perform functions based on the door's state
   - `io::Door_Runnable` houses the core logic behind the sanitation and masks. In `io::Door_Runnable::runnable` we trigger the logic once the door has been opened AND closed.
 - `io_home.h` is the periodic threaded runnable to test whether the user's specified device is home or not. If there is a event driven method for doing this, it will be implemented in the future. For now, the device IP is pinged every 20s and then the loop is slept for the remainder of the time to prevent resources from being used.
 - `io_nfc.h` the runnable that reads the masks state. Currently only tested with a `PN532 NFC Hat`. Has a `oneShot` utility to update the server with mask data. This is UNNECESSARY and only serves the purpose of logging for the webapp displays.
 - `io_uvc.h` handles the mask sanitation logic and interactions with the UVC API endpoint

### `./test`

The core issue with testing in this project is the fact that everything relies on connected hardware. Therefore most testing is still done manually. However, some automated testing using GitHub Actions is done. For this we use `boost::test` and automatically add them to the `cmake` testing via some cmake magic (thanks stackoverflow). Any logic or behaviour that can be tested on an external system SHOULD be tested.




