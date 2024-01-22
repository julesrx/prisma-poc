import { PrismaClient, type User, Position } from '@prisma/client';
import { faker } from '@faker-js/faker';

const client = new PrismaClient();

export const getUsers = async () => {
  // OR: client.$queryRaw<User[]>`SELECT * from "Users"`;
  return await client.user.findMany({
    select: { id: true, keycloakId: true, practice: true, position: true }
  });
};

export const createPractice = async () => {
  const practice = await client.practice.create({
    data: {
      name: faker.lorem.word()
    }
  });

  return practice.id;
};

export const createUser = async () => {
  const avatar = await fetch(faker.image.avatarGitHub())
    .then((r) => r.arrayBuffer())
    .then((a) => Buffer.from(a));

  const practiceIds = await client.practice.findMany({ select: { id: true } });

  const user = await client.user.create({
    data: {
      avatar: avatar,
      keycloakId: crypto.randomUUID(),
      position: faker.helpers.enumValue(Position),
      practiceId: faker.helpers.arrayElement(practiceIds).id
    }
  });

  return user.id;
};
