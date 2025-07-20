import express from "express";
import dotenv from "dotenv";
import BodyParser from "body-parser";
import connectDB from "./db/database.js";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route.js";
import TodoRouter from "./routes/todo.route.js";
import path from 'path';
dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8001;
const _dirname = path.resolve();
connectDB();

app.use(express.json());
app.use(BodyParser.json({ limit: "700mb" }));
app.use(cors());
app.use(cookieParser());

app.use("/api", UserRouter);
app.use("/api", TodoRouter);
const staticPath = path.join(_dirname, "frontend", "react-docker-app", "dist");
app.use(express.static(staticPath));
console.log(path.join(staticPath, "index.html"))
app.get('/*', (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

server.listen(port, () => {
  console.log("server is listening at port " + port);
});
