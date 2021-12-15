# Trailer Locator

API service to get Trailer URL for given Movie source

---
## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node
- #### Node installation

  You can find information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v12.20.2

    $ npm --version
    6.14.11

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ cd trailerLocator
    $ npm install

## Configure app

Open `.env` then edit it with your settings. You will need:

- TMDB_API_KEY - You should register on TMDB developers page to generate a key https://developers.themoviedb.org/3/getting-started/introduction ;
- PORT - Set a port to run your application

## Running the project

    $ npm start

## Test the application

    $ npm test
