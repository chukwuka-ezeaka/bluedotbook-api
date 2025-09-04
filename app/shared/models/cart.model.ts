import mongoose, { Schema, Document } from "mongoose";
import { ICart } from "../types/index.js";

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "processed", "completed"],
      default: "pending",
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const newObject = {
    ...object,
  };

  return newObject;
});

export const CartModel = mongoose.model<ICart>("cart", cartSchema);
