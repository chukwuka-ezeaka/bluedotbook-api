import mongoose, { Schema, Document } from "mongoose";
import { IOrder } from "../types/index.js";

const orderSchema = new Schema<IOrder>(
  {
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "cart",
      },
    ],
    total: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const newObject = {
    ...object,
  };

  return newObject;
});

export const OrderModel = mongoose.model<IOrder>("order", orderSchema);
