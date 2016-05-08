# Abstract Media Keystone Container
a decent starting point for running Keystone.js in a container.

## Prereqs
- docker-engine
- docker-compose (see Setup)

## Getting Started
Follow these steps to get up and running in a hurry:

1. Fork this repo. **DON'T FORGET THIS STEP ...MATT**
2. Clone your fork and cd into the container.
3. run `docker-compose up`


## Setup
- Install [homebrew](http://brew.sh/) and [homebrew cask](http://caskroom.io/) on your Mac.

## Installation steps
### 1. Install [Docker Toolbox](https://www.docker.com/docker-toolbox) with Homebrew Cask
```bash
brew cask install dockertoolbox
```

You shouldn't have to do anything once it's done installing, other than maybe enter your password.

**What's happening:**
_Docker toolbox installs several docker-related command line tools we'll be using. Installing with homebrew cask will all insure that Docker Toolbox's only dependency, [VirtualBox](https://www.virtualbox.org/), is also downloaded._
### 2. Create a VM with docker-machine
```bash
docker-machine create --driver virtualbox --virtualbox-memory 2048 --virtualbox-cpu-count 2 dev
# NOTE: --virtualbox-memory and --virtualbox-cpu-count are optional
```

**What's happening:**
_Docker-machine allows you to quickly create a VM (virtual machine) with VirtualBox. The easiest way to explain the VM is that it's a fully functional computer inside your computer, which we will use to run a docker container. With this command, we're basically saying "Hey, Docker-Machine, use VirtualBox to spin up a small Linux computer, and go ahead and give it a little extra RAM, because we're gonna need it."_

### 3. Check your dev machine's ip address
```bash
docker-machine ip dev
```
**The IP address that's returned is where you'll point your browser to see your container in action.**

### 4. Move to the VM's environment
```bash
eval "$(docker-machine env dev)"
```
