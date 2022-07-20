import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";

import authRouther from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("😲😲😲😲 =>", origin);
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de CORS origin: " + origin + " No autorizado!");
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ejemlo back redirect opcional
app.use("/", redirectRouter);

app.use("/api/v1/auth", authRouther);
app.use("/api/v1/links", linkRouter);
// solo para el ejemplo del login/tojken
//app.use(express.static("public"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("🔥🔥🔥 http://localhost:" + PORT));
