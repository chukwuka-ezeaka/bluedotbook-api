const asyncHandler = (fn) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req: Request, res: Response, next: NextFunction)).catch(next);
export default asyncHandler;
//# sourceMappingURL=async .map
