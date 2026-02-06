import type { Prisma } from '@prisma/client';

export function cleanForPrismaUpdate<T extends object>(
  data: T,
): Prisma.UserUpdateInput {
  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined),
  ) as Prisma.UserUpdateInput;
}
