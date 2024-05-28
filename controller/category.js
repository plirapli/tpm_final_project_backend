const connection = require("../config/connection");

const getCategories = async (req, res) => {
  try {
    const command = `
      SELECT c.id AS id, COUNT(p.id) AS item_qty, c.name AS name 
      FROM products p INNER JOIN categories c ON p.category_id = c.id 
      GROUP BY p.category_id`;
    const [data] = await connection.promise().query(command);

    res.status(200).json({
      status: "Success",
      message: "Successfully retrieved categories",
      data: data,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

module.exports = { getCategories };
