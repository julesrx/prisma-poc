import { PrismaClient, Position, type Article } from '@prisma/client';
import { fa, faker } from '@faker-js/faker';

const client = new PrismaClient();

// ---- Practices
export const createPractice = async () => {
  const practice = await client.practice.create({
    data: {
      name: faker.lorem.word()
    }
  });

  return practice.id;
};

export const getPractices = async () => {
  return await client.practice.findMany();
};

// ---- Users
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

export const getUsers = async () => {
  // OR: client.$queryRaw<User[]>`SELECT * from "Users"`;
  return await client.user.findMany({
    select: { id: true, keycloakId: true, practice: true, position: true }
  });
};

export const getUserAvatar = async (userId: number) => {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: { avatar: true }
  });

  if (!user) return null;

  return user.avatar;
};

// ---- Articles
export const createArticles = async (practiceId: number) => {
  const authorIds = await client.user.findMany({
    where: { practiceId },
    select: { id: true }
  });

  const articles = faker.helpers.multiple(() => {
    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      authorId: faker.helpers.arrayElement(authorIds).id,
      publishDate: faker.date.recent(),
      practiceId
    } as Article;
  });

  const created = await client.article.createMany({ data: articles });
  return created.count;
};

export const getArticles = async (practiceId: number, page: number) => {
  const pageSize = 10;

  return await client.article.findMany({
    orderBy: { publishDate: 'desc' },
    take: pageSize,
    skip: page * pageSize,
    where: { practiceId }
  });
};
