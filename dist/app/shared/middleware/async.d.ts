import { Request, Response, NextFunction } from "express";
import { AsyncHandler } from "../types/index";
declare const asyncHandler: (
  fn: AsyncHandler
) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default asyncHandler;
//# sourceMappingURL=async.d.ts.map
