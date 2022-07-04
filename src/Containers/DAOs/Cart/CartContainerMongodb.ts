import ContainerMongodb from "../../ContainerMongodb";
import { MONGODB_URI } from "../../../config";
import { CartSchema } from "../models";

export default class CartContainerMongodb extends ContainerMongodb {
  constructor() {
    super("carts", MONGODB_URI, "Cart", CartSchema);
  }
}
