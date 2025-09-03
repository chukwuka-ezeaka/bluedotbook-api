import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/index";

const userSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.method("toJSON", function () {
  const { __v, password, resetPasswordToken, resetPasswordExpires, ...object } =
    this.toObject();
  const newObject = {
    __v,
    id: this._id,
    ...object,
  };
  return newObject;
});

export const UserModel = mongoose.model<IUser>("user", userSchema);
