import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { UserModel } from "../models/user.model.js";
import { IUser } from "../types/index.js";

export default function (passport: any): void {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET || "default-secret-key",
        passReqToCallback: true,
      },
      function (req: Request, jwtPayload: any, done: any) {
        return UserModel.findById(jwtPayload.id)
          .then((user: IUser | null) => {
            let details: IUser | null = user;
            if (user && user.blocked) {
              details = null;
            }
            (req as any).user = details;
            return done(null, details);
          })
          .catch((err: any) => {
            return done(null, false, err);
          });
      }
    )
  );
}
