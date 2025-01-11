import express from "express";
import productRouter from "./api/products/products.router.js";
import cartRouter from "./api/carts/carts.router.js";
import path from 'path';

const app = express();

app.use('/static', express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// console.log(process.cwd())
app.listen(8080, () => console.log("server ok puerto 8080"));
