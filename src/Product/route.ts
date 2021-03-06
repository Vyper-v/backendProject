import express, { Router } from "express";
import ProductController from "./controller";
import adminCheck from "../middlewares/adminCheck";
import { validateProduct } from "../middlewares/validateProduct";

const controller = new ProductController();
const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/:id?", controller.getById);
router.post("/", adminCheck(), validateProduct(), controller.post);
router.put("/:id", adminCheck(), controller.put);
router.delete("/:id", adminCheck(), controller.deleteById);

export default router;
