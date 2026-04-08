import { Role } from '@prisma/client';
import * as z from 'zod';

const InviteSchema = z.object({
  token: z.string().min(32, 'Invalid token').max(64, 'Invalid token'),
  email: z.string().email('Invalid email format'),
  accountId: z.string(),
  role: z.nativeEnum(Role),
  expiresAt: z.date(),
  used: z.boolean(),
});

// export const InviteCreateSchema = InviteSchema;
export const InviteCreateOutSchema = InviteSchema.extend({ id: z.string() });
export const InviteUpdateSchema = InviteSchema.partial();

// export type CreateInviteDTO = z.infer<typeof InviteCreateSchema>;
export type CreateInviteOutDTO = z.infer<typeof InviteCreateOutSchema>;
export type UpdateInviteDTO = z.infer<typeof InviteUpdateSchema>;

// Params Schema
export const inviteAccountIdParamSchema = z.object({
  accountId: z.string().uuid(),
});
export const inviteTokenParamSchema = z.object({
  token: z.string().min(32, 'Invalid token').max(64, 'Invalid token'),
});
