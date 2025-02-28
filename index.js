import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import usersRouter from "./user/users-router.js"
import { Database } from "./database/db.js";
import { rateLimitMiddleware } from "./middlewares/rateLimit.js";
import ProductsRouter from "./products/product-router.js";

const app = express();

const database = new Database();
database.setup();

app.use(cors());
app.use(morgan('combined')); // Use 'combined', 'dev', or another format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimitMiddleware);

app.use("/users", usersRouter);
app.use("/products", ProductsRouter);

app.listen(8000, () => {
    console.log("App running on port 8000");
});