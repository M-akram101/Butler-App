import { Router } from 'express';

import {
  acceptInviteHandler,
  createInviteLinkHandler,
} from './invite.controller';
import { validateParams } from '../../middleware/validateParams.middleware';
import {
  inviteAccountIdParamSchema,
  inviteTokenParamSchema,
} from './invite.dto';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

router.post(
  '/:accountId/invite-link',
  authenticate(),
  validateParams(inviteAccountIdParamSchema),
  createInviteLinkHandler,
);
router.post(
  '/:token/invite-accept',
  authenticate(),
  validateParams(inviteTokenParamSchema),
  acceptInviteHandler,
);

export default router;
