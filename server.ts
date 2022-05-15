import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/auth";
import { dbConnection } from "./database/config";
import { notesRouter } from "./routes/notes";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// CORS
app.use(cors());

//Database
dbConnection();

//Read and parse body
app.use(express.json());

//Public directory
app.use("/", express.static("public"));

//Routes
app.use("/api/notes", notesRouter);
app.use("/api/auth", router);
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));
