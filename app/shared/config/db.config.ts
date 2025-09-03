import * as dotenv from "dotenv";

dotenv.config();

interface DatabaseConfig {
  url: string | undefined;
}

const dbConfig: DatabaseConfig = {
  url: process.env.MONGO_URL,
};

export default dbConfig;
