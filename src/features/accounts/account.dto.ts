import * as z from 'zod';
import { AccountType, Area } from '@prisma/client';
import { UserAccountSchemaAccOutput } from '../userAccounts/userAccount.dto';

const AccountSchema = z.object({
  name: z.string().min(1, 'First name is required'),
  type: z.nativeEnum(AccountType),
  area: z.nativeEnum(Area),
  address: z.string().max(100, 'Address must be under 100 characters'),
  capAmount: z.number(),
  userAccounts: z.array(UserAccountSchemaAccOutput).min(1),
});

export const AccountCreateSchema = AccountSchema.omit({ userAccounts: true });
export const AccountCreateOutSchema = AccountSchema.extend({
  id: z.string(),
  userAccounts: z.array(UserAccountSchemaAccOutput).min(1),
});
export const AccountUpdateSchema = AccountSchema.partial();

export type CreateAccountDTO = z.infer<typeof AccountCreateSchema>;
export type CreateAccountOutDTO = z.infer<typeof AccountCreateOutSchema>;

export type UpdateAccountDTO = z.infer<typeof AccountUpdateSchema>;

// Params Schema
export const accountIdParamSchema = z.object({
  id: z.string().uuid(),
});
