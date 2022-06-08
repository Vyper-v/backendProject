import product from "./product";
declare type cart = {
  id?: number;
  timestamp: number;
  products: Array<product>;
};

export default cart;
