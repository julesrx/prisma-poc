import fastify from 'fastify';

import { getUsers, getUsersRaw } from './src/sql';

const app = fastify({ logger: true });

app.get('/users/orm', async () => await getUsers());

app.get('/users/raw', async () => getUsersRaw());

const main = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
