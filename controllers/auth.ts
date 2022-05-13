import express, { Response } from "express";
import {
    CustomRequest,
    NewUser,
    Renew,
    User,
} from "../interface/CustomRequest";
import UserS from "../models/User";
import { JWTGen } from "../helpers/jwt";
import bcrypt from "bcryptjs";

export const newUser = async (req: CustomRequest<NewUser>, res: Response) => {
    const { email, password } = req.body;

    try {
        let user = await UserS.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Another user already exists with this email",
            });
        }

        user = new UserS(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar JWT
        const token = await JWTGen(user.uid, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
};

export const login = async (req: CustomRequest<User>, res: Response) => {
    const { email, password } = req.body;
    try {
        let user = await UserS.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "There is an error with username or password",
            });
        }
        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "There is an error with username or password",
            });
        }

        //Generar JWT
        const token = await JWTGen(user.id, user.name);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
};

export const renewUser = async (req: CustomRequest<Renew>, res: Response) => {
    const { uid, name } = req.body;
    //Generar JWT
    const token = await JWTGen(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
};
