import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import routes from "./app/routes/index.routes";
import mongoose from "mongoose";
import passport from "passport";
import configurePassport from "./app/shared/config/passport.config";
import errorHandler from "./app/shared/middleware/error";
import db from "./app/shared/config/db.config";

dotenv.config();

const app: Application = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// passport
app.use(passport.initialize());
configurePassport(passport);

mongoose
  .connect(db.url || "mongodb://localhost:27017/bluedotbook")
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err: Error) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Bluedotbook.com Test." });
});

//routes
routes(app);
app.use(errorHandler);

// set port, listen for requests
const PORT: number = parseInt(process.env.PORT || "9000", 10);
app.listen(PORT, async () => {
  console.log(`Server is running.send port ${PORT}.`);
});

process.on("unhandledRejection", (err: Error, promise: Promise<any>) => {
  console.log(`Error: ${err.message}`);
  process.exit(0);
});
