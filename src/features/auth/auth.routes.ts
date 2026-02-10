import { Router } from 'express';
import { validate } from '../../middleware/validateRequest';
import { LoginSchema, SignUpSchema } from '../users/user.dto';
import { loginHandler, signUpHandler } from './auth.controller';

const router = Router();

router.post('/signup', validate(SignUpSchema), signUpHandler);
router.post('/login', validate(LoginSchema), loginHandler);

export default router;
