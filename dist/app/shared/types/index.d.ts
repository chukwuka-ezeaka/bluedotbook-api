import { Request, Response, NextFunction } from "express";
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
export interface IUserInput {
    fullname: string;
    email: string;
    username: string;
    password: string;
}
export interface ILoginInput {
    username: string;
    password: string;
}
export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    inStock: boolean;
    category: string;
    user: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
export interface IProductInput {
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl?: string;
    category: string;
    user: string;
    tags?: string[];
}
export interface ICategory extends Document {
    _id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
export interface ICartItem {
    product: string | IProduct;
    quantity: number;
}
export interface ICart extends Document {
    _id: string;
    user: string | IUser;
    items: ICartItem[];
    total: number;
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
export interface ICartInput {
    productId: string;
    quantity: number;
}
export interface IOrderItem {
    product: string | IProduct;
    quantity: number;
    price: number;
}
export interface IOrder extends Document {
    _id: string;
    user: string | IUser;
    items: IOrderItem[];
    total: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
    toJSON(): any;
}
export interface IOrderInput {
    items: IOrderItem[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
}
export interface AuthenticatedRequest extends Request {
    user?: IUser;
}
export interface PassportUser {
    _id: string;
    email: string;
    username: string;
    fullname: string;
    blocked: boolean;
}
export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export interface JwtPayload {
    id: string;
    email: string;
    username: string;
}
export interface IErrorResponse {
    success: boolean;
    message: string;
    statusCode: number;
    error?: any;
}
export interface IApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: any;
}
//# sourceMappingURL=index.d.ts.map