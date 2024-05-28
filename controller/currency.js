const fetch = require("node-fetch");

const getConverted = async (req, res) => {
  try {
    const { currency = "idr" } = req.query;
    const { value } = req.body;

    if (!value) {
      const error = new Error("Value cannot be empty 😠");
      error.statusCode = 401;
      throw error;
    }

    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/idr.min.json`;
    let response = await fetch(url);
    response = await response.json();
    const conversionRate = response.idr[currency];
    const converted = parseFloat((value * conversionRate).toFixed(2));

    res.status(200).json({
      status: "Success",
      message: "Currency converted",
      data: converted,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

module.exports = {
  getConverted,
};
