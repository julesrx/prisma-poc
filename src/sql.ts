import { PrismaClient, type User, Position } from '@prisma/client';
import { faker } from '@faker-js/faker';

const client = new PrismaClient();

export const getUsers = async () => {
  // OR: client.$queryRaw<User[]>`SELECT * from "Users"`;
  return await client.user.findMany();
};

export const createPractice = async () => {
  return await client.practice.create({
    data: {
      name: faker.lorem.word()
    }
  });
};

export const createUser = async () => {
  const avatar = await fetch(faker.image.avatarGitHub())
    .then((r) => r.blob())
    .then((b) => b.arrayBuffer())
    .then((a) => Buffer.from(a));

  const practiceIds = await client.practice.findMany({ select: { id: true } });

  return await client.user.create({
    data: {
      avatar: avatar,
      keycloakId: crypto.randomUUID(),
      position: faker.helpers.enumValue(Position),
      practiceId: faker.helpers.arrayElement(practiceIds).id
    }
  });
};
