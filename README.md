# express-starter
Boilerplate for creating Express project.

[![Build Status](https://github.com/AlexanderMac/express-starter/workflows/CI/badge.svg)](https://github.com/AlexanderMac/express-starter/actions?query=workflow%3ACI)
[![Code Coverage](https://codecov.io/gh/AlexanderMac/express-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/AlexanderMac/express-starter)

### Features
- Solid project structure.
- RESTful Tasks CRUD.
- Parameters validation.
- Promises everywhere.
- Functional and unit tests.
- Clean code:)

### Set
 - **Framework**: Express
 - **Language**: TypeScript
 - **Database**: MongoDB
 - **Loggers**: winston, morgan
 - **Configuration**: n-conf
 - **Linters, Formatters**: ESLint, Prettier
 - **Testing**: mocha, should, supertest, sinon

### How to use
```sh
# Clone this repo:
git clone https://github.com/AlexanderMac/express-starter.git

# Init your repo:
cd express-starter && rm -rf .git && git init

# Install pnpm when needed:
npm install -g pnpm

# Install dependencies:
pnpm i

# Initialize ENVVARs, clone .env.example file and add your values there

# Start the app:
pnpm start
```

### Commands
```sh
pnpm start      # Start the app and watch for changes
pnpm build      # transpile TypeScript to JavaScript
pnpm lint       # run linter and fix found issues
pnpm prettify   # run prettier
pnpm format     # run linter and prettier
# Run tests (one of the commands):
pnpm test
pnpm test -- --grep 'test-name'
pnpm test -- --filter 'path to test file/folder'
npm run coverage # Run code coverage tool
```

### License
[MIT License](LICENSE)

### Author
Alexander Mac
