import { Router } from "express";
import { userModel } from "../dao/models/user.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
//         req.session.user = {
//             name: 'Admin',
//             email: email,
//             role: 'admin'
//         };
//         return res.status(200).send({ status: "success", payload: req.session.user });
//     }

//     const user = await userModel.findOne({ email })
//     if (!user) return res.status(401).send({ status: "error", error: "Email incorrecto" });

//     if (!isValidPassword(user, password)) {
//         return res.status(401).send({ status: 'error', error: 'Contraseña incorrecta' })
//     }
//     req.session.user = {
//         name: `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         age: user.age,
//         role: user.role
//     }
//     res.send({ status: "success", payload: req.session.user })
// })

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {

    if (!req.user) return res.status(401).send({
        status: "error", error: "Email incorrecto"
    })

    if ((req.user.email === "adminCoder@coder.com")) {
        req.session.user = {
            name: `${req.user.first_name} ${req.user.last_name}`,
            email: req.user.email,
            age: req.user.age,
            role: "admin"
        }
        return res.send({ status: 'sucess', payload: req.session.user })
    }

    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role
    }
    res.send({ status: "success", payload: req.user })
})
router.get('/faillogin', (req, res) => {
    res.send({ status: "error", message: "Error al iniciar sesión" })
})

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "Usuario Registrado" })
})
router.get('/failregister', (req, res) => {
    console.log("Error al Registrarse")
    res.send({ status: "error", message: "Error al registrar" })
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })
router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = {
        name: req.user.first_name,
        email: req.user.email,
        avatar: req.user.avatar
    }
    res.redirect('/products')
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