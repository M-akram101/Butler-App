import prisma from '../../prismaClient';
import { AppError } from '../../utils/appError';

export const getAllusers = async ({
  skipValue,
  takeValue,
}: {
  skipValue: number;
  takeValue: number;
}) => {
  // Maybe in the future should select some columns instead of *
  const users = await prisma.user.findMany({
    skip: skipValue,
    take: takeValue,
    where: { isDeleted: false },
  });

  return users;
};
export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email, isDeleted: false },
  });
  if (!user) throw new AppError('Invalid Credentials', 401);

  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id, isDeleted: false },
  });

  return user;
};
