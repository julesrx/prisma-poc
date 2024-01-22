import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = fastify({ logger: true });

app.get('/users', async () => await prisma.user.findMany());

const main = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

main();
