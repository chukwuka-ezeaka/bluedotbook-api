import mongoose from "mongoose";
import { ICart } from "../types/index";
export declare const CartModel: mongoose.Model<
  ICart,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, ICart> &
    ICart &
    Required<{
      _id: string;
    }>,
  any
>;
//# sourceMappingURL=cart.model.d.ts.map
