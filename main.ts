import fastify from 'fastify';
import sensible from '@fastify/sensible';

import {
  createArticles,
  createPractice,
  createUser,
  getArticles,
  getPractices,
  getUserAvatar,
  getUsers
} from './sql';

const app = fastify({ logger: true });
app.register(sensible);

app.get('/practices', async () => await getPractices());
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

app.post('/articles', async (req, rep) => {
  const { practiceId } = req.query as { practiceId: string };
  if (!practiceId || !+practiceId) return rep.badRequest();

  return await createArticles(+practiceId);
});

app.get('/articles', async (req, rep) => {
  const { practiceId } = req.query as { practiceId: string };
  if (!practiceId || !+practiceId) return rep.notFound();

  return await getArticles(+practiceId, 0);
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
