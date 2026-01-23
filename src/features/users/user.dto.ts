import * as z from 'zod';
import {
  Role,
  Industry,
  MaritalStatus,
  Gender,
} from '../../../prisma/generated/prisma/enums';

const UserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  address: z.string().max(100, 'Address must be under 100 characters'),
  // set age from date of birthday
  email: z.string().email('Invalid email format'),
  phoneNumber: z.string().max(11),
  role: z.nativeEnum(Role),
  industry: z.nativeEnum(Industry),
  maritalStatus: z.nativeEnum(MaritalStatus),
  gender: z.nativeEnum(Gender),
  jobTitle: z.string().max(50, 'Job title is too long'),
  dateOfBirth: z.coerce.date(),
});

export const CreateUserSchema = UserSchema;
export const UpdateUserSchema = UserSchema.partial().omit({ email: true });

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
