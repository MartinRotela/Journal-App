import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const validateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //x-token headers
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No token",
        });
    }

    try {
        const { name, uid }: any = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED!
        );
        req.body.uid = uid;
        req.body.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token",
        });
    }

    next();
};
