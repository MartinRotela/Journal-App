"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NoteSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
    uid: {
        type: String,
        required: true,
    },
});
exports.NoteSchema.method("toJSON", function () {
    const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
    object.id = _id;
    return object;
});
const Note = (0, mongoose_1.model)("Note", exports.NoteSchema);
exports.default = Note;
