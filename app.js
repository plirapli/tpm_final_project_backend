require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const currencyRouter = require("./router/currency");
const categoryRouter = require("./router/category");

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/currency", currencyRouter);
app.use("/categories", categoryRouter);

// Menjalankan server di port 3001
app.listen(port, () => console.log("Server connected on port " + port));
