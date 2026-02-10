// src/prismaClient.ts

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL;

// Create PostgreSQL connection pool
const pool = new pg.Pool({ connectionString });

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Initialize Prisma Client with adapter
export const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

export default prisma;
