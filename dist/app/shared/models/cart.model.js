import mongoose, { Schema } from "mongoose";
const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
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
export const CartModel = mongoose.model("cart", cartSchema);
//# sourceMappingURL=cart.model .map
