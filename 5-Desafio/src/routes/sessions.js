import { Router } from "express";
import { userModel } from "../dao/models/user.js";

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = {
            name: 'Admin',
            email: email,
            role: 'admin'
        };
        return res.status(200).send({ status: "success", payload: req.session.user });
    }

    const user = await userModel.findOne({ email, password });
    if (!user) {
        return res.status(400).send({ status: "error", error: "Usuario no existe" });
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role
    }

    res.send({ status: "success", payload: req.session.user });
})

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body
    const exists = await userModel.findOne({ email })
    if (exists) {
        return res.status(400).send({ status: 'error', error: "Ya existe un usuario con este Email" })
    }
    const user = {
        first_name, last_name, email, age, password
    }
    let result = await userModel.create(user)
    res.send({ status: "success", payload: "Usuario Registrado" })

})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            res.status(500).send({ status: "error", error: "Error al cerrar sesión" });
        } else {
            res.redirect('/login');
        }
    });
});

export default router