import { getUser, getUsers, updateUser } from "../services/user.service";
import asyncHandler from "../shared/middleware/async";
export const getUsersController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const users = await getUsers(req: Request, res: Response, next: NextFunction);
  return res.status(200).send(users);
});
export const getUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await getUser(req: Request, res: Response, next: NextFunction);
  return res.status(200).send(user);
});
export const updateUserController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await updateUser(req: Request, res: Response, next: NextFunction);
  return res.status(200).send(user);
});
//# sourceMappingURL=user.controller .map
