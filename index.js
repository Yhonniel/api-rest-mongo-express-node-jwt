import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
//const express = require("express");
import authRouther from "./routes/auth.route.js";
const app = express();

app.use(express.json());

app.use("/api/v1", authRouther);

const PORT = process.env.PORT || 3001;

app.listen(3001, () => console.log("Puerto activo en " + PORT));
