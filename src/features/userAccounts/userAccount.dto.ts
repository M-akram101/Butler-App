import { Role } from '@prisma/client';
import * as z from 'zod';

const UserAccountSchema = z.object({
  accountId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.nativeEnum(Role),
});

export const UserAccountCreateSchema = UserAccountSchema;

export const UserAccountCreateOutSchema = z.object({
  id: z.string().uuid(),
  accountId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.nativeEnum(Role),
});

export const UserAccountUpdateSchema = z.object({
  id: z.string().uuid(),
  accountId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.nativeEnum(Role),
});
export const UserAccountUpdateOutSchema = z.object({
  id: z.string().uuid(),
  accountId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.nativeEnum(Role),
});

export type CreateUserAccountDTO = z.infer<typeof UserAccountCreateSchema>;
export type CreateUserAccountOutDTO = z.infer<
  typeof UserAccountCreateOutSchema
>;

// Params Schema
export const userAccountIdParamSchema = z.object({
  id: z.string().uuid(),
});
