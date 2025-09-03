import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
export const CategoryModel = mongoose.model("category", categorySchema);
//# sourceMappingURL=category.model .map
