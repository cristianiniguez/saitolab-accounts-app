# Saito Lab Accounts (API)

API of Saito Lab Accounts (Manage your money in one place easily)

## Description

This API uses:

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/) (with PostgreSQL)

## Installation

Before cloning this repo and start working, install Node and Docker. Use the method you like.

```bash
# clone this repository
$ git clone https://github.com/cristianiniguez/saitolab-accounts-api.git

# install the packages
$ npm install
```

## Env variables and preparing the database

```bash
# copy and past .env.example file to a .env file (then fill the variables)
$ cp .env.example .env

# start postgresql and pgadmin docker containers
$ docker compose -d postgres

# push and sync db (this needs to be done only one time at the beginning and every time the entities are modified)
$ npm run db:push
```

## Running and working on the app

```bash
# start postgresql docker container (if it is not turned on)
$ docker compose -d postgres

# (optional) start prisma studio
$ npm run db:studio

# start the development server
$ npm run start:dev

# after working, stop containers
$ docker compose down
```

## Do you want to contribute to this project?

[Contact me](https://www.cristianiniguez.com/#contact)
