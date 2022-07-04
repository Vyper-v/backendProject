import dotenv from "dotenv";
import express from "express";
import apiProduct from "./Product/route";
import apiCart from "./Cart/route";
dotenv.config();

const port: number = Number(process.env.PORT) || 8080;
const app = express();

app.use("/api/products", apiProduct);
app.use("/api/cart", apiCart);
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not found",
    statusCode: 404,
    description: `${req.method} ${req.url} not found`,
  });
  next();
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
