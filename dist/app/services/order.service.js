import { OrderModel } from "../shared/models/order.model";
import asyncHandler from "../shared/middleware/async";
import ErrorResponse from "../shared/utils/errorResponse";
import { paginate, pageCount, search } from "../shared/utils/index";
export const createOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const newOrder = new OrderModel({
      ...req.body,
      user: userId,
    });
    const order = await newOrder.save();
    return {
      success: true,
      message: "Order created successfully",
      data: order,
    };
  }
);
export const getOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, pageSize = 50, ...rest } = req.query;
    const searchQuery = await search(rest);
    const pagination = paginate({
      page: Number(page),
      pageSize: Number(pageSize),
    });
    const orders = await OrderModel.find(searchQuery)
      .limit(pagination.limit)
      .skip(pagination.offset)
      .sort({ createdAt: -1 });
    const count = await OrderModel.countDocuments(searchQuery);
    return {
      success: true,
      message: "Orders retrieved successfully",
      pagination: {
        ...pageCount({ count, page: Number(page), pageSize: Number(pageSize) }),
      },
      data: orders,
    };
  }
);
export const getOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }
    return {
      success: true,
      message: "Order retrieved successfully",
      data: order,
    };
  }
);
export const updateOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const order = await OrderModel.findOne({ _id: id, user: userId });
    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }
    const { body } = req;
    for (const value in body) {
      order[value] = body[value];
    }
    const updatedOrder = await order.save();
    return {
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    };
  }
);
export const deleteOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      return next(new ErrorResponse("User not authenticated", 401));
    }
    const order = await OrderModel.findOne({ _id: id, user: userId });
    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }
    await OrderModel.findByIdAndDelete(id);
    return {
      success: true,
      message: "Order deleted successfully",
    };
  }
);
//# sourceMappingURL=order.service .map
