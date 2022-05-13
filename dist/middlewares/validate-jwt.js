"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const validateJWT = (req, res, next) => {
    //x-token headers
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No token",
        });
    }
    try {
        const { name, uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.body.uid = uid;
        req.body.name = name;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid token",
        });
    }
    next();
};
exports.validateJWT = validateJWT;
