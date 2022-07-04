import { Request, Response } from "express";
import USEDB from "../Containers/DAOs/index";

export default class ProductController {
  products: any;
  constructor() {
    this.init();
  }

  init = async () => {
    const { ProductContainer } = await USEDB();
    this.products = new ProductContainer();
  };

  getById = async (req: Request, res: Response) => {
    if (!req.params.id) {
      return res.send(await this.products.getAll());
    }

    const id = Number(req.params.id);
    const data = await this.products.getById(id);
    return data
      ? res.send(data)
      : res.status(404).json({
          statusCode: 404,
          error: "Not found",
          description: `product ${req.params.id} not found`,
        });
  };

  post = async (req: Request, res: Response) => {
    const data = Object.keys(req.body).length !== 0 && req.body;
    const id = await this.products.save({ ...data, createdAt: Date.now() });

    return res.send({ id });
  };

  put = async (req: Request, res: Response) => {
    const data = req.body;
    const updatedData = await this.products.update(Number(req.params.id), data);
    res.send(updatedData);
  };

  deleteById = async (req: Request, res: Response) => {
    const ID = Number(req.params.id);
    const data = await this.products.deleteById(ID);
    res.send(data);
  };
}
