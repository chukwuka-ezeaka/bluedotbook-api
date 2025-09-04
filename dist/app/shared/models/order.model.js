import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema({
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
orderSchema.method("toJSON", function () {
    const { __v, ...object } = this.toObject();
    const newObject = {
        ...object,
    };
    return newObject;
});
export const OrderModel = mongoose.model("order", orderSchema);
//# sourceMappingURL=order.model.js.map