import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/auth";
import { dbConnection } from "./database/config";
import { notesRouter } from "./routes/notes";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

//Database
dbConnection();

//Read and parse body
app.use(express.json());

//Public directory
app.use(express.static("public"));

//Routes
app.use("/api/notes", notesRouter);
app.use("/api/auth", router);

app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));
