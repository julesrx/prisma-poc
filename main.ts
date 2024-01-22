import fastify from 'fastify';
import sensible from '@fastify/sensible';

import { createPractice, createUser, getUserAvatar, getUsers } from './src/sql';

const app = fastify({ logger: true });
app.register(sensible);

app.post('/practices', async () => await createPractice());

app.get('/users', async () => await getUsers());
app.post('/users', async () => await createUser());

app.get('/users/:userId/avatar', async (req, rep) => {
  const { userId } = req.params as { userId: string };

  const avatar = await getUserAvatar(+userId);
  if (!avatar) return rep.notFound();

  rep.type('image/png');
  rep.send(avatar);
});

const main = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
