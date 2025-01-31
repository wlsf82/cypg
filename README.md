# cypg

Sample project to demonstrate how to integrate Cypress with a PostgreSQL database.

## Pre-requirements

You will need to have [Docker](https://www.docker.com/products/docker-desktop/), [git](https://git-scm.com/), [Node.js](https://nodejs.org/) and npm installed on your computer.

For this project, the following versions of git, Node.js, and npm were used:

```sh
$ git --version
# git version 2.42.1

$ node --version
# v22.13.1

$ npm --version
# 10.9.2

```

## Starting and running the app

- To start the database, [read the db docs](./db/README.MD).
- To install and start the backend, [read the backend docs](./backend/README.md).
- To install and start the frontend, [read the frontend docs](./frontend/README.md).

## Cypress tests

1. In the operating system where the app is running, define an environment variable called `DATABASE_URL` with the following value `postgresql://dbuser@localhost:5432/demo`.
2. Run `npm i` to install the dev dependencies.
3. Then, run `npm run cy:open` to open the Cypress App and run the tests in interactive mode, or, run `npm test` to run the tests in headless mode.

## License

This project is licensed under the MIT License.

___

Developed with 💚 by [Walmyr](https://walmyr.dev).
