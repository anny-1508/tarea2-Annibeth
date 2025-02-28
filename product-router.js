import { Router } from "express";
import { middlewareCustom } from "../middlewares/middlewareCustom.js";
import {
    CreateProducts,
    DeleteProduct,
    GetAllProducts,
    Inventory,
    UpdateProduct,
} from "./product-controllers.js";
import { body, param } from "express-validator";
import validate from "../../middlewares/validate.js";
import { authMiddleware } from "../../middlewares/auth.js";

const productsRouter = Router();

productsRouter.get("/", [authMiddleware], GetAllProducts);

productsRouter.post(
    "/",
    [
        authMiddleware,
        body("description").exists().isString(),
        body("name").exists().isString(),
        body("price").exists().isNumeric(),
        validate,
    ],
    CreateProducts
);

productsRouter.post(
    "/inventory",
    [
        authMiddleware,
        body("name").exists().isString(),
        body("description").exists().isString(),
        body("price").exists().isNumeric(),
        validate,
    ],
    Inventory
);

//  [Patch] localhost:8000/products/2
productsRouter.patch(
    "/:id",
    [
        authMiddleware,
        param("id").exists().isNumeric(),
        body("id").not().exists(),
        body("name").exists().isString(),
        body("description").exists().isString(),
        body("price").exists().isNumeric(),
        validate,
    ],
    UpdateProduct
);
//  [DELETE] localhost:8000/products/2
productsRouter.delete(
    "/:id",
    [authMiddleware, param("id").exists().isNumeric(), validate],
    DeleteProduct
);

export default productsRouter;