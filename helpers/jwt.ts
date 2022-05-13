import * as jwt from "jsonwebtoken";
import { Renew } from "../interface/CustomRequest";

export const JWTGen = (uid: string, name: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED!,
            { expiresIn: "2h" },
            (err, token) => {
                if (err) {
                    console.log(err), reject("JWT failed");
                }
                resolve(token);
            }
        );
    });
};
