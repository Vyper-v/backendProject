import { MONGODB_URI } from "../../../config";
import ContainerMongodb from "../../ContainerMongodb";
import { ProductSchema } from "../models";

export default class ProductontainerMongodb extends ContainerMongodb {
  constructor() {
    super("products", MONGODB_URI, "Product", ProductSchema);
  }
}
