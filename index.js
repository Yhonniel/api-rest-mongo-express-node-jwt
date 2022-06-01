import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRouther from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouther);

// solo para el ejemplo del login/tojken
app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("🔥🔥🔥 http://localhost:" + PORT));
