import item from "../../lib/item";
import product from "./product";
declare type cart = {
  id?: number;
  timestamp: number;
  products: Array<product & item>;
};

export default cart;
