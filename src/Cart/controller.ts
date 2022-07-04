import { Request, Response } from "express";
import cart from "../types/cart";
import USEDB from "../Containers/DAOs/index";

export default class CartController {
  cart: any;

  constructor() {
    this.init();
  }

  init = async () => {
    const { CartContainer } = await USEDB();
    this.cart = new CartContainer();
  };

  getById = async (req: Request, res: Response) => {
    const data = await this.cart.getById(req.params.id);
    return data
      ? res.send(data)
      : res.status(404).json({
          statusCode: 404,
          error: "Not found",
          description: `cart ${req.params.id} not found`,
        });
  };

  post = async (req: Request, res: Response) => {
    const productsData: [] = Object.keys(req.body).length !== 0 && req.body; // dont required
    const data: cart = {
      timestamp: Date.now(),
      products: productsData || [],
    };

    const id = await this.cart.save(data);
    return res.send({ id, message: `saved ${data.products.length} items` });
  };
  // const put = async (req: Request, res: Response) => {
  //   const data = req.body as Partial<cart>;
  //   const id = await this.cart.update(Number(req.params.id), data);
  //   res.send({ id });
  // };

  deleteById = async (req: Request, res: Response) => {
    res.send(await this.cart.deleteById(Number(req.params.id)));
  };

  deleteProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const idProd = Number(req.params.id_prod);
    const data = (await this.cart.getById(id)) as cart;
    if (data) {
      const products = data.products.filter((item) => item.id !== idProd);

      await this.cart.replace(id, products);
      return res.send({
        statusCode: 200,
        description: `Product ${idProd} removed from Cart ${id}`,
      });
    }

    return res.status(404).json({
      statusCode: 404,
      error: "Not found",
      description: `Product ${idProd} not found in Cart ${id}`,
    });
  };
}
