# express-starter
`Express` project template.

[![Build Status](https://travis-ci.org/AlexanderMac/express-starter.svg?branch=master)](https://travis-ci.org/AlexanderMac/express-starter)


### Features
- Advanced project structure with separation for routes, controllers, data-services.
- RESTful User CRUD API.
- Parameters validation.
- Promises everywhere.
- Configuration per environment.
- Gulp tasks.
- Functional and unit tests.
- Clean code:)


### Used packages
 - Backend - `express`
 - View engine - `jade`
 - Database - `mongodb`
 - Promises - `bluebird`
 - Task runner - `gulp`
 - JS linter - `jshint`
 - Testing - `mocha`, `should`, `supertest`, `sinon`
 - Logger - `winston, express-winston`
 - Configuration: `n-conf`
 - Custom errors: `n-custom-errors`


### How to use
```sh
# Clone this repo:
`git clone https://github.com/AlexanderMac/express-starter.git`

# Init your repo:
`cd express-starter && rm -rf .git && git init` 

# Install dependencies:
`npm i`

# Configure database:
# Open `./config/environment/development.json` and change `db` key to your own database connection string.

# Start app:
`npm start`
```

### Commands

```sh
# Install dependencies
$ npm i
# Run tests (one of the commands):
$ gulp test # run all tests
$ gulp test --grep 'test-name'
$ gulp test --filter 'path to test file/folder'
# Run code coverage tool:
$ gulp coverage
# Run jshint tool (one of the commands):
$ gulp lint # check all sources
$ gulp lint --filter 'path to source file/folder'
$ gulp lint-server # check server sources
$ gulp lint-test # check test sources
# Start app:
$ npm start
```

### Service structure
- [config] - app configuration options
- [server]
  - [controllers] - controllers
  - [db] - database manager and models
  - [data-services] - local data services
  - [routes] - API end points
  - [services] - remote service wrappers
  - [util]
    - [validation-util] - validation utils
    - [logger] - app logger
- [tasks] - gulp tasks
- [test] - unit and functional tests


### Author
Alexander Mac


### License
[MIT License](LICENSE)
