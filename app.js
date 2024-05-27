require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const todoRouter = require("./router/todo");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/todos", todoRouter);

// Menjalankan server di port 3001
app.listen(port, () => console.log("Server connected on port " + port));
