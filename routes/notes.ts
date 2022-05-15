// Notes Rutes
// host+api/notes

import express from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { check } from "express-validator";
import { deleteNote, getNotes, postNote, putNote } from "../controllers/notes";

const router = express.Router();

router.use(validateJWT);

router.get("/", getNotes);

router.post("/new", postNote);

router.put("/:id", putNote);

router.delete("/:id", deleteNote);

export { router as notesRouter };
