import { PrismaClient, type User } from '@prisma/client';

const client = new PrismaClient();

export const getUsers = async () => {
  return await client.user.findMany({ select: { name: true, email: true } });
};

export const getUsersRaw = async () => {
  return await client.$queryRaw<User[]>`SELECT name, email from Users`;
};
