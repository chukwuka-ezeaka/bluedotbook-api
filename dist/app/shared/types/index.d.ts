import { Document } from "mongoose";
export interface IUser extends Document {
    _id: string;
    fullname: string;
    email: string;
    username: string;
    password: string;
    blocked: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    inStock: boolean;
    category: string | ICategory;
    user: string | IUser;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
export interface ICategory extends Document {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
export interface ICart extends Document {
    _id: string;
    user: string | IUser;
    product: string | IProduct;
    quantity: number;
    status: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
export interface IOrder extends Document {
    _id: string;
    user: string | IUser;
    items: string[] | ICart[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
//# sourceMappingURL=index.d.ts.map