const cardService = require("../services/card");
const responseHandler = require("../utils/responseHandler");

exports.getDashboard = async (req, res) => {
  try {
    const stats = await cardService.getDashboardStats();
    return responseHandler.success(
      res,
      "Dashboard",
      {
        stats,
      },
      200
    );
  } catch (error) {
    return responseHandler.error(res, error.message, 500);
  }
};
