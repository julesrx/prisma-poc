# Primsa POC

POC of a node API using [Prisma](https://www.prisma.io).  
Follow the quickstart guide [here](https://www.prisma.io/docs/getting-started/quickstart).

## Usage

1. start the postgresql docker image with `docker compose up`
2. copy the `.env.example` file to `.env` and configure it (the existing values should be correct)
3. run the command `npm run prisma migrate dev` to create and update the database
4. use postman on the endpoints located in the `main.ts` file

## Documentation

- prisma schema reference : https://www.prisma.io/docs/orm/reference/prisma-schema-reference
- prisma cli reference : https://www.prisma.io/docs/orm/reference/prisma-cli-reference
- prisma client reference : https://www.prisma.io/docs/orm/reference/prisma-client-reference
- support PostgreSQL : https://www.prisma.io/docs/orm/overview/databases/postgresql
- raw queries : https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries
- database introspection (to add prisma to an existing project) : https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgresql
