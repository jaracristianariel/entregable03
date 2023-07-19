import express from "express";
import ProductManager from "../ProductManager.js";

const app = express();
app.use(express.urlencoded({extended: true}));

const productos = new ProductManager();
const allProducts = productos.getProducts();

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await allProducts)
    let todos = await allProducts;
    let productosLimit = todos.slice(0, limit)
    res.send(await productosLimit);
});
app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let todos = await allProducts;
    let productById = todos.find(product => product.id === id);
    res.send(productById);
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`expres por local host ${server.address().port}`);
})
server.on("error", (error) => console.log(`error del servidor ${error}`));