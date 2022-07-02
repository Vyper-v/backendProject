import { Request, Response } from "express";
import Container from "../Containers/Container";
import product from "../types/product";

const products = new Container("products");

const getById = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.send(await products.getAll());
  }

  const id = Number(req.params.id);
  const data = await products.getById(id);
  return data
    ? res.send(data)
    : res.status(404).json({
        statusCode: 404,
        error: "Not found",
        description: `product ${req.params.id} not found`,
      });
};
const post = async (req: Request, res: Response) => {
  const data: product = Object.keys(req.body).length !== 0 && req.body;
  const id = await products.save({ ...data, timestamp: Date.now() });

  return res.send({ id });
};
const put = async (req: Request, res: Response) => {
  const data = req.body as Partial<product>;
  const updatedData = await products.update(Number(req.params.id), data);
  res.send(updatedData);
};
const deleteById = async (req: Request, res: Response) => {
  const ID = Number(req.params.id);
  const data = await products.deleteById(ID);
  res.send(data);
};

export { getById, post, put, deleteById };
