import * as dotenv from "dotenv";
dotenv.config();
const dbConfig = {
    url: process.env.MONGO_URL,
};
export default dbConfig;
//# sourceMappingURL=db.config.js.map