import { Router } from 'express';
import { validate } from '../../middleware/validateRequest';
import { loginHandler, signUpHandler } from '../auth/auth.controller';
import { LoginSchema, SignUpSchema } from './user.dto';

const router = Router();

router.post('/signup', validate(SignUpSchema), signUpHandler);
router.post('/login', validate(LoginSchema), loginHandler);

export default router;
