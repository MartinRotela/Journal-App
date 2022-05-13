import express, { Request, Response } from "express";
import Note from "../models/Notes";

export const getNotes = async (req: Request, res: Response) => {
    const eventos = await Note.find().where("user").equals(req.body.uid);

    res.json({
        ok: true,
        eventos,
    });
};

export const postNote = async (req: Request, res: Response) => {
    const note = new Note(req.body);

    try {
        note.user = req.body.uid;
        console.log(note.user);
        const savedNote = await note.save();
        res.json({
            ok: true,
            note: savedNote,
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: "something wrong",
        });
    }
};

export const putNote = async (req: Request, res: Response) => {
    const noteId = req.params.id;
    const uid = req.body.uid;

    try {
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({
                ok: false,
                msg: "Note does not exist",
            });
        }

        if (note.user !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You do not have permission",
            });
        }

        const newNote = {
            ...req.body,
            user: uid,
        };

        const noteUpdated = await Note.findByIdAndUpdate(noteId, newNote, {
            new: true,
        });

        return res.json({
            ok: true,
            note: noteUpdated,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    const noteId = req.params.id;
    const uid = req.body.uid;

    try {
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({
                ok: false,
                msg: "Note does not exist",
            });
        }

        if (note.user !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "You do not have permission",
            });
        }

        const noteDeleted = await Note.findByIdAndDelete(noteId);

        res.json({
            ok: true,
            note: noteDeleted,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error",
        });
    }
};
