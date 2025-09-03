import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./app/routes/index.routes";
import mongoose from "mongoose";
import passport from "passport";
import configurePassport from "./app/shared/config/passport.config";
import errorHandler from "./app/shared/middleware/error";
import db from "./app/shared/config/db.config";
dotenv.config();
const app = express();
app.use(express.send());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
configurePassport(passport);
mongoose
  .connect(db.url || "mongodb://localhost:27017/bluedotbook")
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.send({ message: "Bluedotbook.com Test." });
});
routes(app);
app.use(errorHandler);
const PORT = parseInt(process.env.PORT || "9000", 10);
app.listen(PORT, async () => {
  console.log(`Server is running.send port ${PORT}.`);
});
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  process.exit(0);
});
//# sourceMappingURL=server .map
