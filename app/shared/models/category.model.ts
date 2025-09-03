import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "../types/index";

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const newObject = {
    ...object,
  };
  return newObject;
});

export const CategoryModel = mongoose.model<ICategory>(
  "category",
  categorySchema
);
