import { NextFunction, Request, Response } from "express";
import item from "../../lib/item";
import product from "../types/product";

export function validateProduct() {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as product;
    const error = validate(data);
    if (error !== null) {
      return res.status(400).json(error);
    }
    next();
  };
}

export function validate(data: product): object | null {
  if (
    !data.name ||
    !data.description ||
    !data.code ||
    !data.image ||
    !data.price ||
    !data.stock
  ) {
    return {
      error: "Missing required fields",
    };
  }

  if (
    typeof data.name !== "string" ||
    typeof data.description !== "string" ||
    typeof data.code !== "number" ||
    typeof data.image !== "string" ||
    typeof data.price !== "number" ||
    typeof data.stock !== "number"
  ) {
    return {
      error: "Invalid data type",
    };
  }

  if (data.price < 0 || data.stock < 0 || data.code < 0) {
    return {
      error: "Invalid data",
    };
  }

  return null;
}

export function validateID(data: product & item) {
  if (data.id === undefined || data.timestamp === undefined) {
    return {
      message: "All products must have an id and timestamp",
    };
  }

  return null;
}
