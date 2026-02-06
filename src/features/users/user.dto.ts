import * as z from 'zod';
import { Role, Industry, Gender, MaritalStatus } from '@prisma/client';

const UserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  passConfirm: z.string().min(8, 'Password must be at least 8 characters'),
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

export const UserOutputSchema = UserSchema.partial()
  .omit({
    password: true,
    passConfirm: true,
  })
  .extend({
    id: z.string(),
    createdAt: z.date(),
    isActive: z.boolean(),
    isApproved: z.boolean(),
  });
export const CreateUserSchema = UserSchema;
export const UpdateUserSchema = UserSchema.partial()
  .omit({
    email: true,
    password: true,
    passConfirm: true,
  })
  .strip();
export const SignUpSchema = UserSchema.refine(
  (data) => data.password === data.passConfirm,
  {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  },
);
export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type SignUpDTO = z.infer<typeof SignUpSchema>;
export type UserOutputDTO = z.infer<typeof UserOutputSchema>;
