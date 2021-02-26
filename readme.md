# express-starter
Boilerplate for creating Express project.

[![Build Status](https://github.com/AlexanderMac/express-starter/workflows/CI/badge.svg)](https://github.com/AlexanderMac/express-starter/actions?query=workflow%3ACI)
[![Code Coverage](https://codecov.io/gh/AlexanderMac/express-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/AlexanderMac/express-starter)

### Features
- Advanced project structure with separation for routes, controllers, data-services.
- RESTful User CRUD API.
- Parameters validation.
- Promises everywhere.
- Configuration per environment.
- Functional and unit tests.
- Clean code:)

### Used packages
 - Backend - `express`
 - View engine - `pug`
 - Database - `mongodb`
 - Promises - `bluebird`
 - Linter - `eshint`
 - Testing - `mocha`, `should`, `supertest`, `sinon`
 - Logger - `winston, morgan`
 - Configuration: `n-conf`

### How to use
```sh
# Clone this repo:
git clone https://github.com/AlexanderMac/express-starter.git

# Init your repo:
cd express-starter && rm -rf .git && git init

# Install dependencies:
npm i

# Configure database:
# Open `./config/environment/development.json` and change `db` key to your database connection string.

# Start app:
npm start

# Run tests (one of the commands):
npm test # run all tests
npm test --grep 'test-name'
npm test --filter 'path to test file/folder'

# Run code coverage tool:
npm run coverage

# Run linter tool:
npm lint
```

### Project structure
- [config] - app configuration options
- [src]
  - [controllers] - controllers
  - [db] - database manager and models
  - [data-services] - local data services
  - [routes] - API end points
  - [services] - remote service wrappers
  - [util]
    - [logger] - app logger
- [test] - unit and functional tests

### Author
Alexander Mac

### License
[MIT License](license)
