import { SchemaDefinition } from "mongoose";

const ProductSchema: SchemaDefinition = {
  createdAt: { type: Date, default: Date.now },
  name: String,
  description: String,
  code: Number,
  image: String,
  price: Number,
  stock: Number,
};

export default ProductSchema;
