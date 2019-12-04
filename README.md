# chat-app-users

The user profiles service for the chat application. Source written in **TypeScript** (3.7). Runs on **Node.js**.

## Before starting

The following variables must be defined before running the application:
- `MONGODB_URI`: it is a [MongoDB Connection String](https://docs.mongodb.com/manual/reference/connection-string/) that includes the username, password (if any), host, port and name of a pre-existing database.
- `PORT`: this is automatically assigned by some services (Heroku, etc.), so be careful before setting it (default 3000).

### Development mode

When running the server with the `run dev` script, the variables are looked from a `.env` file located at the root directory. This is done via the [`env-cmd` package](https://github.com/toddbluhm/env-cmd)

```sh
# .env example
MONGODB_URI=mongodb://user:p4ssw0rd@192.168.0.1:PORT/data?authSource=admin
NODE_ENV=development
```

## Scripts

```sh
# Install all dependencies
yarn install

# transpile the application from TypeScript source to JavaScript (tsc)
yarn run build

# run tsc in watch mode
yarn run build-watch

# start the application in development mode**
yarn run dev

# start the application is production mode
yarn start
```

## Docker container

If you don't have a Mongo database available, one quick solution is to run it as a Docker container.

A simple configuration file is included to create a MongoDB Docker container and volume.

You'll need to install `docker-compose` and setup some variables before starting the container, see [`./docker/docker-compose.yaml`](./docker/docker-compose.yaml) for more details.

```sh
## After defining the required env variables
cd docker
docker-compose up
```

## Author

Adrian Gomez

## License

[MIT](LICENSE)
