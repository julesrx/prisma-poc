import { PrismaClient, type User } from '@prisma/client';

const client = new PrismaClient();

export const getUsers = async () => {
  return await client.user.findMany({ select: { id: true } });
};

export const getUsersRaw = async () => {
  return await client.$queryRaw<User[]>`SELECT "id" from "Users"`;
};
