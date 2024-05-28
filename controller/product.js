const connection = require("../config/connection");

const getProductByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const command =
      "SELECT id, title, description, is_completed, created_at FROM products WHERE category_id = ?";
    const [data] = await connection.promise().query(command, [category_id]);

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved product list",
      data: data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const getProductTotalByCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const command =
      "SELECT SUM(qty) AS totalproducts FROM products WHERE category_id = ?";
    const [[data]] = await connection.promise().query(command, [category_id]);

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved product list",
      data: data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const getProductTotal = async (req, res) => {
  try {
    const command = "SELECT SUM(qty) AS totalproducts FROM products";
    const [[data]] = await connection.promise().query(command);

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved product list",
      data: data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const getMaxPriceProduct = async (req, res) => {
  try {
    const command =
      "SELECT name, price FROM products ORDER BY price DESC LIMIT 1";
    const [[data]] = await connection.promise().query(command);

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved product list",
      data: data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const getMaxQtyProduct = async (req, res) => {
  try {
    const command = "SELECT name, qty FROM products ORDER BY qty DESC LIMIT 1";
    const [[data]] = await connection.promise().query(command);

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved product list",
      data: data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const insertProduct = async (req, res) => {
  try {
    const { name, qty, price, category_id } = req.body;

    if (!name || !qty || !price || !category_id) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 401;
      throw error;
    }
    const command =
      "INSERT INTO products (name, qty, price, category_id) VALUES (?, ?, ?, ?)";
    await connection.promise().query(command, [name, qty, price, category_id]);

    res.status(201).json({
      status: "Success",
      message: "Product added to list",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, qty, price, category_id } = req.body;

    if (!name || !qty || !price || !category_id) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 401;
      throw error;
    }
    const command = `UPDATE products SET name=?, qty=?, price=?, category_id=? WHERE id=?`;
    await connection
      .promise()
      .query(command, [name, qty, price, category_id, id]);

    res.status(200).json({
      status: "Success",
      message: "Product updated",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "Error",
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const command = `DELETE FROM products WHERE id=?`;
    await connection.promise().query(command, [id]);

    res.status(200).json({
      status: "Success",
      message: "Product deleted",
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      status: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  getProductByCategory,
  getProductTotal,
  getProductTotalByCategory,
  getMaxPriceProduct,
  getMaxQtyProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};
