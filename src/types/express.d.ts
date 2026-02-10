import 'express';

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      user?: {
        id: string;
      };
    }
  }
}

declare global {
  namespace Express {
    interface Locals {
      user: {
        id: string;
        role: Role;
      };
    }
  }
}
