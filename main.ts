import fastify from 'fastify';

import { createPractice, createUser, getUsers } from './src/sql';

const app = fastify({ logger: true });

app.post('/practices', async () => await createPractice());

app.get('/users', async () => await getUsers());
app.post('/users', async () => await createUser());

const main = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
