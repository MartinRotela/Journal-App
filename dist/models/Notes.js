"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NoteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
    user: {
        type: String,
        required: true,
    },
});
const Note = (0, mongoose_1.model)("Note", exports.NoteSchema);
exports.default = Note;
