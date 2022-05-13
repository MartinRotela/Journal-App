"use strict";
// Rutas de Usuarios / Auth
// host + /api/auth
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const field_validator_1 = require("../middlewares/field-validator");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = express_1.default.Router();
exports.router = router;
router.post("/new", [
    (0, express_validator_1.check)("name", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio").isLength({ min: 6 }),
    field_validator_1.fieldValidator,
], auth_1.newUser);
router.post("/", [
    (0, express_validator_1.check)("email", "El email es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "El password es obligatorio").isLength({ min: 6 }),
    field_validator_1.fieldValidator,
], auth_1.login);
router.get("/renew", validate_jwt_1.validateJWT, auth_1.renewUser);
