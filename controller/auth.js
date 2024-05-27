require("dotenv").config();
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const connection = require("../config/connection");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      const msg = `${!username ? "Username" : "Password"} cannot be empty`;
      const error = new Error(msg);
      error.statusCode = 400;
      throw error;
    }
    const checkCommand = `SELECT * FROM users WHERE username = ?`;
    const [[user]] = await connection.promise().query(checkCommand, [username]);
    if (!user) {
      const error = new Error("Wrong email or password");
      error.statusCode = 404;
      throw error;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      const error = new Error("Wrong email or password");
      error.statusCode = 404;
      throw error;
    }
    const { id, name } = user;
    const data = { id, name, username: user.username };
    const token = jwt.sign(data, secret, { algorithm: "HS256" });
    res.status(200).json({
      status: "Success",
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const register = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    if (!name || !username || !password) {
      const msg = `${
        !name ? "Name" : !username ? "Username" : "Password"
      } cannot be empty`;
      const error = new Error(msg);
      error.statusCode = 400;
      throw error;
    }
    const salt = await bcrypt.genSalt(6);
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = nanoid();
    const checkCommand = `SELECT id FROM users WHERE username = ?`;
    const [[checkId]] = await connection
      .promise()
      .query(checkCommand, [username]);

    if (checkId) {
      const error = new Error(`Username ${username} already exist!`);
      error.statusCode = 403;
      throw error;
    }
    const query = `INSERT INTO users VALUES (?, ?, ?, ?)`;
    await connection
      .promise()
      .query(query, [id, name, username, hashedPassword]);

    res.status(201).json({
      status: "Success",
      message: "Register Successful",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

module.exports = { login, register };
