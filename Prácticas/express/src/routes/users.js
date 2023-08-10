import { Router } from "express";
import { uploader } from "../utils.js";

const router = Router()

const users = []

router.get("/", (req, res) => {
    res.send({ users })
})

router.post("/", uploader.single('file'), (req, res) => {
    const user = req.body
    users.push(user)
    user.file = `http:localhost:8080/static/images/${req.file.filename}`
    res.send({ status: "sucess" })
})

export default router