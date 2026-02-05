import prisma from '../../prismaClient';
import { AppError } from '../../utils/appError';
import {
  cleanForPrismaUpdate,
  stripUndefined,
} from '../../utils/stripUndefined';
import type { UpdateUserDTO } from './user.dto';

export const getAllusers = async ({
  skipValue,
  takeValue,
}: {
  skipValue: number;
  takeValue: number;
}) => {
  // Maybe in the future should select some columns instead of *, also sort by createdAT?
  const users = await prisma.user.findMany({
    skip: skipValue,
    take: takeValue,
    where: { isDeleted: false },
  });

  return users;
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id, isDeleted: false },
  });

  // check existence

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: { email, isDeleted: false },
  });
  if (!user) throw new AppError('Invalid Credentials', 401);

  return user;
};

export const updateUser = async (userId: string, data: UpdateUserDTO) => {
  const cleanedData = await cleanForPrismaUpdate(data);
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: cleanedData,
  });
  return updatedUser;
};
