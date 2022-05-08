# HandSignMe

[![Integration](https://github.com/pjdevs/handsignme/actions/workflows/integration.yml/badge.svg)](https://github.com/pjdevs/handsignme/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pjdevs_handsignme&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pjdevs_handsignme)
[![CodeCov](https://codecov.io/gh/pjdevs/handsignme/branch/master/graph/badge.svg?token=6Z612DQ7SS)](https://codecov.io/gh/pjdevs/handsignme)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

HandSignMe is a PDF signing web service with invitations.

## Usage

The easiest way to use HandSignMe is with its Docker image.

TODO later...

## Setup a development environment

The following describes all steps to setup a developement environment on Linux.

### Project structure

The folder `api` contains the Node.js based REST API and `app` contains the Vue.js based application.

### Developpement requirements

The developpement environment requires :

- [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com/) to build and run the project (versions >= 14.x of Node.js should work fine).

```
$ sudo apt install nodejs npm
```

- [Vue.js CLI](https://cli.vuejs.org/) for the web application.

```
$ npm install -g @vue/cli
```

- [Docker](https://www.docker.com/) to run [Mail Hog](https://github.com/mailhog/MailHog) and optionnaly build an image for the project.

See installation steps [here](https://docs.docker.com/engine/install/).

- [SQLite 3](https://sqlite.org/index.html) to manage the database.

```
$ sudo apt install sqlite3
```

### Setup the environment

To setup the environment follow this steps :

1. Install dependencies for both projects :
```
$ cd api
$ npm install
$ cd ../app
$ npm install
```

2. Run MailHog with docker
```
$ docker pull mailhog/mailhog
$ docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

3. The database is fully managed by `sequelize.js`. Run the following to migrate and populate the database :

```
$ cd api
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```

4. To have access to the thumnails you have to edit the file : ``` etc/ImageMagick-7/policy.xml ``` (it can be ImageMagick-6, it depends of the version of the software) and add before ```</policymap> ``` the line ```  <policy domain="coder" rights="read | write" pattern="PDF" />```

### Tests

To run the unit tests of the API :
```
$ cd api
$ npm test
```

To run the unit tests of the application :
```
$ cd app
$ npm test
```

### Start

Then you can start the service :

1. Create a `.env` file for passwords, host, port...

2. Sart the Node.js API
```
$ cd api
$ npm run dev # for developement
$ npm run prod # for production
```

3. Run the Vue.js application
```
$ cd app
$ npm run serve
```

### Deploy an image with Docker

TODO later...

## Authors

- Pierre-Jean MOREL
- Quentin PAUWELS
- Matthieu BRASSART
- Hedi GASSARA
- Quatadah NASDAMI
- Mohamed JAMIL
- Youssef TOUMI