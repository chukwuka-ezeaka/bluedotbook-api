import { Request, Response, NextFunction } from "express";
declare const verify: {
    checkDuplicateEmail: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    checkDuplicateUsername: (req: Request, res: Response, next: NextFunction) => Promise<any>;
};
export default verify;
//# sourceMappingURL=verify.d.ts.map