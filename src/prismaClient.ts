// src/prismaClient.ts

import { PrismaClient } from '../prisma/generated/prisma';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Export the initialized Prisma Client instance
export default prisma;
