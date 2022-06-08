import { NextFunction, Request, Response } from "express";
import item from "../../lib/item";
import product from "../types/product";
import { validate, validateID } from "./validateProduct";

export function validateCart() {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as (item & product)[];

    if (Object.keys(req.body).length === 0) {
      return next();
    }

    // all data must have id and timestamp
    const badID = data.find((item) => validateID(item) !== null);
    if (badID) {
      return res.status(400).json(validateID(badID));
    }
    // all data must have product properties
    const badData = data.find((item) => validate(item) !== null);
    if (badData) {
      return res.status(400).json(validate(badData));
    }

    next();
  };
}
