import { Router } from "express";
import ProductManager from "../dao/managers/productManagerMongo.js";
import CartManager from "../dao/managers/cartManagerMongo.js";

const router = Router()
const pManager = new ProductManager()
const cManager = new CartManager()

router.get('/', (req, res) => {
    res.render("home")
})

router.get('/products', async (req, res) => {
    const {
        limit = 10,
        page = 1,
        sort = "asc",
        title = "",
        category = ""
    } = req.query

    const products = await pManager.getAllPaginated(limit, page, sort, title, category)
    try {
        products.docs = await products.docs.map(product => {
            const {
                _id,
                title,
                description,
                price,
                code,
                stock,
                category,
                thumbnail
            } = product
            return {
                id: _id,
                title,
                description,
                price,
                code,
                stock,
                category,
                thumbnail
            }
        })

        const info = {
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage
                ? `http://localhost:8080/products?page=${products.prevPage}`
                : null,
            nextLink: products.hasNextPage
                ? `http://localhost:8080/products?page=${products.nextPage}`
                : null
        }

        const listProducts = products.docs
        const { hasPrevPage, hasNextPage, page, prevLink, nextLink } = info
        res.render("products", { listProducts, hasPrevPage, hasNextPage, page, prevLink, nextLink })
    } catch (error) {
        console.log(error)
    }
})

router.get('/carts/:cid', async (req, res) => {
    const cart = await cManager.getCartById(req.params.cid)
    res.render("cart", { cart })
})

router.get('/realtimeproducts', (req, res) => {
    res.render("realTimeProducts")
})

router.get('/chat', (req, res) => {
    res.render("chat")
})

//SESSION
router.get('/login', (req, res) => {
    // res.render('login')
})

router.get('/register', (req, res) => {
    // res.render('register')
})

router.get('/profile', (req, res) => {
    // res.render('profile')
})

export default router