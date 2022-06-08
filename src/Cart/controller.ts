import { Request, Response } from "express";
import Container from "../../lib/Container";
import item from "../../lib/item";
import cart from "../types/cart";
import product from "../types/product";

const carts = new Container("carts");

const getById = async (req: Request, res: Response) => {
  const data = await carts.getById(Number(req.params.id));
  return data
    ? res.send(data)
    : res.status(404).json({
        statusCode: 404,
        error: "Not found",
        description: `cart ${req.params.id} not found`,
      });
};
const post = async (req: Request, res: Response) => {
  const productsData: (item & product)[] =
    Object.keys(req.body).length !== 0 && req.body; // dont required
  const data: cart = {
    timestamp: Date.now(),
    products: productsData || [],
  };

  const id = await carts.save(data);
  return res.send({ id, message: `saved ${data.products.length} items` });
};
const put = async (req: Request, res: Response) => {
  const data = req.body as Partial<cart>;
  const id = await carts.update(Number(req.params.id), data);
  res.send({ id });
};
const deleteById = async (req: Request, res: Response) => {
  res.send(await carts.deleteById(Number(req.params.id)));
};

export { getById, post, put, deleteById };