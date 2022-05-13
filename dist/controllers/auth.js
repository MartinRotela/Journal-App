"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewUser = exports.login = exports.newUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../helpers/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Another user already exists with this email",
            });
        }
        user = new User_1.default(req.body);
        //Encriptar contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        yield user.save();
        //Generar JWT
        const token = yield (0, jwt_1.JWTGen)(user.uid, user.name);
        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
});
exports.newUser = newUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "There is an error with username or password",
            });
        }
        //Confirmar los passwords
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "There is an error with username or password",
            });
        }
        //Generar JWT
        const token = yield (0, jwt_1.JWTGen)(user.id, user.name);
        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
});
exports.login = login;
const renewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, name } = req.body;
    //Generar JWT
    const token = yield (0, jwt_1.JWTGen)(uid, name);
    res.json({
        ok: true,
        uid,
        name,
        token,
    });
});
exports.renewUser = renewUser;
