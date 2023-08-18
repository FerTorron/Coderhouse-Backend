import { Router } from "express"
import CartManager from "../manager/CartManager.js"
import { __dirname } from "../utils.js"

const router = Router()
const manager = new CartManager("./src/database/carrito.json")
let cart = await manager.getCarts()

router.get("/", async (req, res) => {
    res.send({ cart })
})

router.get("/:cid", async (req, res) => {
    const idCart = parseInt(req.params.cid, 10);
    const carritoFound = await manager.getCartById(idCart);
    res.send(carritoFound);
});


router.post("/", async (req, res) => {
    const newcart = await manager.addCart();
    res.send({ status: "success", newcart });
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        await manager.addProductToCart(cid, pid);
        res.send({ status: "success", message: "Producto agregado al Carrito." });
    } catch (error) {
        console.error("Error al Agregar Producto al Carrito:", error);
        res.status(500).send({ status: "error", message: "Failed to add product to cart." });
    }
});


export default router