import { Role } from '@prisma/client';
import * as z from 'zod';

export const UserAccountSchema = z.object({
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
  role: z.nativeEnum(Role),
});
export const UserAccountSchemaAccOutput = UserAccountSchema.omit({
  accountId: true,
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
export type UpdateUserAccountDTO = z.infer<typeof UserAccountUpdateSchema>;

// Params Schema
export const idParamSchema = z.object({
  id: z.string().uuid(),
});
export const accountIdParamSchema = z.object({
  accountId: z.string().uuid(),
});
export const userIdParamSchema = z.object({
  userId: z.string().uuid(),
});
