import { Schema, model } from "mongoose";

export const NoteSchema = new Schema({
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

const Note = model("Note", NoteSchema);

export default Note;
