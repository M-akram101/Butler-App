import { sendSuccess } from '../../utils/apiResponse';
import { catchAsync } from '../../utils/catchAsync';
import type { UpdateUserDTO } from './user.dto';
import { getAllusers, updateUser } from './user.service';

export const getAllUsersHandler = catchAsync(async (req, res, next) => {
  const skipValue = Number(req.query.skip) || 0;
  const takeValue = Number(req.query.take) || 10;
  const users = await getAllusers({ skipValue, takeValue });
  sendSuccess(res, users);
});
export const updateUserHandler = catchAsync(async (req, res, next) => {
  const userId = req.params.id as string;
  const data: UpdateUserDTO = req.body;
  const user = await updateUser(userId, data);
  sendSuccess(res, user);
});
