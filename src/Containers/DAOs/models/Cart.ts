import { Schema, SchemaDefinition } from "mongoose";
import ProductSchema from "./Product";
const CartSchema: SchemaDefinition = {
  createdAt: { type: Date, default: Date.now },
  quantity: Number,
  total: Number,
  products: [new Schema(ProductSchema)],
};

export default CartSchema;
