// Rutas de Usuarios / Auth
// host + /api/auth

import express from "express";
import { login, newUser, renewUser } from "../controllers/auth";
import { check } from "express-validator";
import { fieldValidator } from "../middlewares/field-validator";
import { validateJWT } from "../middlewares/validate-jwt";

const router = express.Router();

router.post(
    "/new",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio").isLength({ min: 6 }),
        fieldValidator,
    ],
    newUser
);
router.post(
    "/",
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password es obligatorio").isLength({ min: 6 }),
        fieldValidator,
    ],
    login
);

router.get("/renew", validateJWT, renewUser);

export { router };
