import { sendSuccess } from '../../utils/apiResponse';
import { catchAsync } from '../../utils/catchAsync';
import { acceptInvite, createInviteLink } from './invite.service';

export const createInviteLinkHandler = catchAsync(async (req, res) => {
  const userId = res.locals.user.id;
  const accountId = req.params.id as string;

  const invite = await createInviteLink(userId, accountId);

  res.json({
    inviteLink: `https://butler.com/invite/${invite.token}`,
  });
});

export const acceptInviteHandler = catchAsync(async (req, res) => {
  const userId = res.locals.user.id;
  const token = req.params.token as string;

  const userAccount = await acceptInvite(userId, token);

  sendSuccess(res, userAccount);
});
