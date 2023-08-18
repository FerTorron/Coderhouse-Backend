import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";
import { __dirname } from "../utils.js";

const router = Router()
const pManager = new ProductManager(__dirname + '/database/products.json')

router.get('/', async (req, res) => {
    const listProducts = await pManager.getProducts()
    res.render("home", { listProducts })
})

router.get('/realtimeproducts', (req, res) => {
    res.render("realTimeProducts")
})

export default router