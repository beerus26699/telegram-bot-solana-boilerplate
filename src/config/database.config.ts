import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
    uri: process.env.MONGO_URI,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    dbName: process.env.MONGO_DATABASE,
}));
