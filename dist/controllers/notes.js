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
exports.deleteNote = exports.putNote = exports.postNote = exports.getNotes = void 0;
const Notes_1 = __importDefault(require("../models/Notes"));
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield Notes_1.default.find()
        .where("uid")
        .equals(req.body.uid)
        .populate("uid", "name")
        .sort({ date: -1 });
    res.json({
        ok: true,
        notes,
    });
});
exports.getNotes = getNotes;
const postNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = new Notes_1.default(req.body);
    try {
        note.uid = req.body.uid;
        const savedNote = yield note.save();
        res.json({
            ok: true,
            note: savedNote,
        });
    }
    catch (error) {
        res.json({
            ok: false,
            msg: "something wrong",
        });
    }
});
exports.postNote = postNote;
const putNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    const uid = req.body.uid;
    try {
        const note = yield Notes_1.default.findById(noteId);
        if (!note) {
            return res.status(404).json({
                ok: false,
                msg: "Note does not exist",
            });
        }
        if (note.uid !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You do not have permission",
            });
        }
        const newNote = Object.assign(Object.assign({}, req.body), { uid });
        const noteUpdated = yield Notes_1.default.findByIdAndUpdate(noteId, newNote, {
            new: true,
        });
        return res.json({
            ok: true,
            note: noteUpdated,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
});
exports.putNote = putNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.id;
    const uid = req.body.uid;
    try {
        const note = yield Notes_1.default.findById(noteId);
        if (!note) {
            return res.status(404).json({
                ok: false,
                msg: "Note does not exist",
            });
        }
        if (note.uid !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You do not have permission",
            });
        }
        const noteDeleted = yield Notes_1.default.findByIdAndDelete(noteId);
        res.json({
            ok: true,
            note: noteDeleted,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
});
exports.deleteNote = deleteNote;
