// validators/params.ts
import { z } from 'zod';

export const idParam = (key: string = 'id') =>
  z.object({
    [key]: z.string().min(1),
  });
