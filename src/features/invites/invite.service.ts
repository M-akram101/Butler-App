import crypto from 'crypto';
import { AppError } from '../../utils/appError';
import prisma from '../../prismaClient';

export const createInviteLink = async (userId: string, accountId: string) => {
  // 1. Check user is ADMIN
  const membership = await prisma.userAccount.findFirst({
    where: { userId, accountId },
  });

  if (!membership || membership.role !== 'ADMIN') {
    throw new AppError('Not authorized', 403);
  }

  // 2. Generate token
  const token = crypto.randomBytes(32).toString('hex');

  // 3. Save invite
  return prisma.invite.create({
    data: {
      token,
      accountId,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    },
  });
};

export const acceptInvite = async (userId: string, token: string) => {
  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite || invite.used) {
    throw new AppError('Invalid invite', 400);
  }

  if (invite.expiresAt < new Date()) {
    throw new AppError('Invite expired', 400);
  }

  // Prevent duplicate membership
  const existing = await prisma.userAccount.findFirst({
    where: {
      userId,
      accountId: invite.accountId,
    },
  });

  if (existing) {
    throw new AppError('Already a member', 400);
  }

  // Create membership
  const userAccount = await prisma.userAccount.create({
    data: {
      userId,
      accountId: invite.accountId,
      role: invite.role,
    },
  });

  // Mark invite as used
  await prisma.invite.update({
    where: { token },
    data: { used: true },
  });

  return userAccount;
};
