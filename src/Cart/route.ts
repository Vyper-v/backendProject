import express, { Router } from "express";
import { validateCart } from "../middlewares/validateCart";
import * as controller from "./controller";

const router = Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/:id", controller.getById);
router.post("/", validateCart(), controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.deleteById);

export default router;
