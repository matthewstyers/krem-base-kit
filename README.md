# Abstract Media Co. KREM Starter Kit

## The Basic Elements. (_Or, WTF is KREM?_)
KREM is a handy acronym we use to represent each of the application components within this project:

- [KeystoneJS](http://keystonejs.com): An open-source, highly hackable CMS built on NodeJS
- [ReactJS](https://facebook.github.io/react/): A fast, flexible Javascript library
- [ExpressJS](http://expressjs.com): A minimalist, unopinionated web framework for NodeJS
- [MongoDB](https://www.mongodb.com): A document database designed for ease of development and scaling

## Architecture
Each project is like a snowflake – unique, and also probably constructed from the remnants of a million other snowflakes, ephemeral by nature, and highly sensitive to its environment. Belabored analogies aside, this base kit is designed with the understanding that ideal solutions widely over time and across use cases, and a project's ideal infrastructure, traditionally conceptualized as a strata-like hierarchy of layers, is considerably more valuable when constituted as a loosely held, molecular cluster of services.

The most tangible manifestation of this philosophy is in this kit's use of [Docker](https://www.docker.com) containers as the basic unit of application composition. In containerizing each of an application's component parts, we're able to construct an ecosystem in which each of those parts:
- is decoupled from the others,
- has an internal, port-based communication network,
- achieves higher a level of disposability,
- minimizes potential security vulnerabilities

(_It's not coincidental that these four features comprise 1/3 of the [12-Factor Application](http://12factor.net)._)

In it's vanilla configuration, the 4 fundamental components are structured as follows:

```sh
|---keystone:
      git:  https://github.com/matthewstyers/keystone
      docker: styers/keystone:dev
    # available as a service for development/custom packing,
    # but can also be installed as package on the server
  |-server:
      git: https://github.com/matthewstyers/keystone-express-starter
      docker: styers/keystone-express-starter:dev
  |-client:
      git: https://github.com/matthewstyers/react-redux-starter
      docker: styers/react-redux-starter:dev
  |-mongo # mLab Sandbox (free)

```
## Getting Started
### Prerequisites
- Install [homebrew](http://brew.sh/) and [homebrew cask](http://caskroom.io/) on your Mac.

### Installation steps
#### 1. Install [Docker Toolbox](https://www.docker.com/docker-toolbox) with Homebrew Cask
```bash
brew cask install dockertoolbox
```

**What's happening:**
_Docker toolbox installs several docker-related command line tools we'll be using. Installing with homebrew cask will all insure that Docker Toolbox's only dependency, [VirtualBox](https://www.virtualbox.org/), is also installed._

### 2. Create a VM with docker-machine
```bash
docker-machine create --driver virtualbox dev
```

**What's happening:**
_Docker-machine manages virtual machines. In this case we're just creating a simple linux kernal that will manage our app containers._

### 3. Check your dev machine's ip address
```bash
docker-machine ip dev
```
**The IP address that's returned is the local address of the machine. It will almost definitely be** `192.168.99.100`.

### 4. Move to the VM's environment
```bash
eval "$(docker-machine env dev)"
```

**What's happening:**
_We're telling dockertoolbox that when we issue a docker-specific command (like_ `docker foo` or `docker-compose bar`_), we actually want that instruction redirected to the docker-machine environment._

### 5. Pull in the submodule projects
```bash
git clone --recursive https://github.com/matthew-styers.git swaco-data-server
```

**What's happening:**
_We're making a trackable copy of the source code on our local (host) machine. This source code also includes the instructions docker needs to build our container._

### 6. Get/create environment variables
- If you have access to the necessary `.env` file, move it into the project root (the folder you just cloned from github).
- If you don't have access, simply rename the file in the project root called 'env-sample' to '.env'

### 7. Build your Docker container
- `cd swaco-data-server` to get into the folder with the source code, then,
```bash
docker-compose up api
```
 **What's Happening now**
_Docker is building a container (a light-weight, self-contained 'ecosystem' where our code lives) inside our VM. It's basically mimicking the production environment, so that when the code gets pushed up to its 'live' home, we don't have to worry about whether or not it will work. It's also creating a 'volume' (shared folder) for the source code, so we can edit the code on our computer and then see those changes in real time without having to rebuild the container._

Once the entire script finishes running, you should see something along the lines of
```bash
------------------------------------------------
KeystoneJS Started:
swaco-data-server is ready on port 5000
------------------------------------------------
```
at the end of your output. Point your browser to the IP you received in step 4, and you should see a working copy of styers.co in your browser.

## Tips
- use `ctrl + c` to kill your container, and `docker-compose up` to restart it.
- If you close your terminal session (or switch tabs), you'll need to re-run steps 3-4.
- use `docker-machine stop dev` to shut down your VM at the end of a session and `docker-machine start dev` to start it back up.
- Your ip address may change when you stop/start your machine.
