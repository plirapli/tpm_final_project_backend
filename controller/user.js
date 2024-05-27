const getProfile = async (req, res, next) => {
  try {
    const decoded = req.decoded;
    res.status(200).json({
      status: "Success",
      message: "Successfully get profile",
      data: decoded,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
};

module.exports = { getProfile };
