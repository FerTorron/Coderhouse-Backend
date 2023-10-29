import { Router } from "express";
import ProductManager from "../dao/managers/productManagerMongo.js";
import { checkRole } from "../middlewares/auth.js";

const router = Router()
const pManager = new ProductManager()

router.get("/", async (req, res) => {
    const products = await pManager.getProducts()
    if (products.length === 0) {
        res.send("No hay productos en la tienda")
    }
    else {
        res.send({ status: "success", payload: { products } })
    }
})

router.get('/:pId', async (req, res) => {
    const idProduct = req.params.pId
    const productFind = await pManager.getProductById(idProduct)
    res.send({ status: 'success', productFind })
})

router.post("/", checkRole("admin"), async (req, res) => {
    const product = req.body
    const newProduct = await pManager.addProduct(product)
    res.send({ status: 'sucess', newProduct })
})

router.put('/:pId', checkRole("admin"), async (req, res) => {
    const newData = req.body
    const idProduct = req.params.pId
    const updatedProduct = await pManager.updateProduct(idProduct, newData)
    res.send({ status: 'sucess', updatedProduct })
})

router.delete('/:pId', checkRole("admin"), async (req, res) => {
    const idProduct = req.params.pId
    const deletedProduct = await pManager.deleteProduct(idProduct)
    res.send({ status: 'sucess', deletedProduct })
})

export default router