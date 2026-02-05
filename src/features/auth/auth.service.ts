import { email } from 'zod';
import { getUserByEmail } from '../users/user.service';
import { AppError } from '../../utils/appError';
import {
  createAccessToken,
  hashPassword,
  verifyPassword,
} from '../../utils/auth';
import type { SignUpDTO, UserOutputDTO } from '../users/user.dto';
import prisma from '../../prismaClient';

export const signUp = async (data: SignUpDTO): Promise<UserOutputDTO> => {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }] },
  });

  if (existingUser)
    throw new AppError('Email or phone already registered', 409);

  // Hash password
  const hashedPassword = await hashPassword(data.password);
  const newUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      phoneNumber: data.phoneNumber,
      role: data.role,
      industry: data.industry,
      maritalStatus: data.maritalStatus,
      gender: data.gender,
      jobTitle: data.jobTitle,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      isActive: false,
      isApproved: false,
      isDeleted: false,
    },
  });

  // Map to DTO
  const userData: UserOutputDTO = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    phoneNumber: newUser.phoneNumber,
    role: newUser.role,
    industry: newUser.industry,
    maritalStatus: newUser.maritalStatus,
    gender: newUser.gender,
    jobTitle: newUser.jobTitle,
    address: newUser.address,
    dateOfBirth: newUser.dateOfBirth,
    isActive: newUser.isActive,
    isApproved: newUser.isApproved,
    createdAt: newUser.createdAt,
  };

  return userData;
};
export const login = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AppError('Invalid Credentials', 401);
  }

  const isMatching = await verifyPassword(password, user.password);

  if (!isMatching) {
    throw new AppError('Invalid Credentials', 401);
  }
  const token = createAccessToken(user.id);
  return { token, user: { id: user.id, email: user.email } };
};
