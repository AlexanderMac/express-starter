# express-starter
`Express` project basic configuration.

## Overview
Tools:
 - Platform - `Node.js`
 - Web Framework - `Express.js`
 - View engine - `Ejs`
 - CSS framework - `Twitter Bootstrap`
 - Database - `MongoDB`
 - Promises - `Q`
 - Task runner - `Gulp`
 - JS lint - `JsHint`
 - Testing - `Mocha`, `Should`, `Supertest`, `Sinon`
 - Client dependencies resolver - `Bower`
 - Logger - `Express-Winston`
 - Client modules defining - `Browserify`

Project structure:
- client (_client side files_)
  - css (_client css files_)
  - js  (_javascript source files_)
- config (_project configuration files_)
- gulp (_gulp tasks_)
- public (_public files (compiled css, js, fonts), static files_)
- server (_server side files_)
  - models (_models declarations_)
  - routes (_app routes_)
  - services (_business logic_)
  - util (_app common utilities_)
  - views (_views_)
  - app.js (_main app file_)
- test (_tests_)

## How to use
1.Clone this repository.
2.Install dependencies:
```
npm install
```
3.Configure database:
``` js
// ./config/mongo.js
module.exports = {
  test: {
    connectionString: 'mongodb://localhost:27017/{your test db name}'
  },
  development: {
    connectionString: 'mongodb://localhost:27017/{your dev db name}'
  },
  production: {
    connectionString: 'mongodb:{path and name your prod db}'
  }
};
```


## Commands

- Build sources:
```
npm run build
```
- Run linter and tests
```
npm test
<OR>
npm test --grep (specify required tests)
```
- Run server:
```
npm start
```
- Watch and rebuild changed files:
```
npm run watch
```

## License
This code available under the MIT License.
See License.md for details.  

## Authors
**Alexander Mac** ([amatsibarov@gmail.com](mailto:amatsibarov@gmail.com))
