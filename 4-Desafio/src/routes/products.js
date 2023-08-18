import { Router } from "express";
import ProductManager from '../manager/ProductManager.js'

const router = Router()
const manager = new ProductManager('./src/database/products.json')
let products = await manager.getProducts()


router.get('/', (req, res) => {
    const { limit } = req.query
    if (limit) {
        const limitParse = parseInt(limit, 10)
        const productsSlice = products.slice(0, limitParse)
        res.send(productsSlice)
    } else {
        res.send({ products })
    }
})

router.get('/:pId', async (req, res) => {
    const idProduct = parseInt(req.params.pId, 10)
    const productFind = await manager.getProductById(idProduct)
    if (!productFind) {
        res.send(`No se encontró el Producto con el ID: ${idProduct}`)
    }
    res.send(productFind)
})

router.post("/", async (req, res) => {
    const product = req.body
    manager.addProduct(product.title, product.description, product.price, product.status, product.category, product.thumbnail, product.code, product.stock)
    res.send({ status: 'sucess' })
})

router.put('/:pId', async (req, res) => {
    const newData = req.body
    const idProduct = parseInt(req.params.pId, 10)
    manager.updateProduct(idProduct, { title: newData.title, description: newData.description, price: newData.price, status: newData.status, category: newData.category, thumbnail: newData.thumbnail, code: newData.code, stock: newData.stock })
    res.send({ status: 'sucess' })
})

router.delete('/:pId', async (req, res) => {
    const idProduct = parseInt(req.params.pId, 10)
    manager.deleteProduct(idProduct)
    res.send({ status: 'sucess' })
})

export default router