import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import { __dirname } from './utils.js'

import ProductManager from './manager/ProductManager.js'
const pManager = new ProductManager(__dirname + '/database/products.json')

import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import viewRouter from './routes/view.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewRouter)

const server = app.listen(8080, () => {
    console.log("Servidor Inicializado en el Puerto 8080")
})

const socketServer = new Server(server)
socketServer.on('connection', async socket => {
    console.log("Cliente conectado con ID:", socket.id)
    const products = await pManager.getProducts();
    socket.emit('productos', products);

    socket.on('addProduct', async (data) => {
        await pManager.addProduct(data.title, data.description, data.price, data.status, data.category, data.thumbnail, data.code, data.stock);
        const updatedProducts = await pManager.getProducts();
        socketServer.emit('productosupdated', updatedProducts);
    });

    socket.on("deleteProduct", async (id) => {
        console.log("ID del producto a eliminar:", id);
        const deletedProduct = await pManager.deleteProduct(id);
        const updatedProducts = await pManager.getProducts();
        socketServer.emit("productosupdated", updatedProducts);
    });
})
