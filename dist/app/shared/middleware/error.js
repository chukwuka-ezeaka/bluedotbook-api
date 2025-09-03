import ErrorResponse from "../utils/errorResponse";
const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err);
  if (err.name === "CastError") {
    const message = `Resource Not Found`;
    error = new ErrorResponse(message, 404);
  }
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }
  if (err.name === "ValidationError" && typeof err.errors === "object") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(err.message, 400);
  }
  res.status(error.statusCode || 500).send({
    success: false,
    message: error.message || "Server Error",
  });
};
export default errorHandler;
//# sourceMappingURL=error .map
