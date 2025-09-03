import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "../types/index";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.method("toJSON", function () {
  const { __v, ...object } = (this as any).toObject();
  const newObject = {
    ...object,
  };

  return newObject;
});

export const ProductModel = mongoose.model<IProduct>("product", productSchema);
