"use strict";
// Notes Rutes
// host+api/notes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
const express_1 = __importDefault(require("express"));
const validate_jwt_1 = require("../middlewares/validate-jwt");
const express_validator_1 = require("express-validator");
const field_validator_1 = require("../middlewares/field-validator");
const notes_1 = require("../controllers/notes");
const router = express_1.default.Router();
exports.notesRouter = router;
router.use(validate_jwt_1.validateJWT);
router.get("/", notes_1.getNotes);
router.post("/new", [
    (0, express_validator_1.check)("title", "El titulo es obligatorio").not().isEmpty(),
    field_validator_1.fieldValidator,
], notes_1.postNote);
router.put("/:id", notes_1.putNote);
router.delete("/:id", notes_1.deleteNote);
