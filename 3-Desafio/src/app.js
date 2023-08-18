import express from 'express'
import ProductManager from './ProductManager.js'

const productManager = new ProductManager('./src/products/products.json')
let products = await productManager.getProducts()

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Servidor ON")
})

app.get("/products", (req, res) => {
    const { limit } = req.query
    if (limit) {
        const limitParse = parseInt(limit, 10)
        const productsSlice = products.slice(0, limitParse)
        res.send(productsSlice)
    } else {
        res.send(products)
    }

})

app.get("/products/:pid", async (req, res) => {
    try {
        const idProduct = parseInt(req.params.pid, 10)
        const productFind = await productManager.getProductById(idProduct)
        if (!productFind) {
            res.send(`No se encontró el Producto con el ID: ${idProduct}`)
        }
        res.send(productFind)
    } catch (error) {
        console.error(error)
        res.status(500).send("Error interno del Servidor")
    }
})

app.listen(8080, () => {
    console.log("Servidor Inicializado en el Puerto 8080")
})