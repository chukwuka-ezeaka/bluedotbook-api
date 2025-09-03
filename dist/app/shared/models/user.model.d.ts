import mongoose from "mongoose";
import { IUser } from "../types/index";
export declare const UserModel: mongoose.Model<
  IUser,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, IUser> &
    IUser &
    Required<{
      _id: string;
    }>,
  any
>;
//# sourceMappingURL=user.model.d.ts.map
