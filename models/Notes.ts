import { Schema, model } from "mongoose";

export const NoteSchema = new Schema({
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

NoteSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Note = model("Note", NoteSchema);

export default Note;
