import express from 'express'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.listen(8080, () => {
    console.log("Servidor Inicializado en el Puerto 8080")
})