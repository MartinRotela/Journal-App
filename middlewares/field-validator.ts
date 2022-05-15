import { Response } from "express";
import { NextFunction } from "express";
import { validationResult } from "express-validator";
import { CustomRequest, NewUser, User } from "../interface/CustomRequest";

export const fieldValidator = (
    req: CustomRequest<NewUser | User>,
    res: Response,
    next: NextFunction
) => {
    //Manejo de errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.array(),
        });
    }

    next();
};
