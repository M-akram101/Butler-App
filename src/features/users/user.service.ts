import { prisma } from '../../prismaClient';
import { AppError } from '../../utils/appError';
import { cleanForPrismaUpdate } from '../../utils/stripUndefined';
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
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
      phoneNumber: true,
      role: true,
      industry: true,
      maritalStatus: true,
      gender: true,
      jobTitle: true,
      dateOfBirth: true,
    },
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
  const cleanedData = cleanForPrismaUpdate(data);

  if (Object.keys(cleanedData).length === 0)
    throw new AppError('No fields to update', 400);

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: cleanedData,
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
      phoneNumber: true,
      role: true,
      industry: true,
      maritalStatus: true,
      gender: true,
      jobTitle: true,
      dateOfBirth: true,
    },
  });

  return updatedUser;
};

export const deleteUser = async (userId: string) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { isDeleted: true },
  });

  return updatedUser;
};
