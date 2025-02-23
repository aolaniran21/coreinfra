const cardService = require("../services/card");
const responseHandler = require("../utils/responseHandler");

exports.getDashboard = async (req, res) => {
  try {
    const stats = await cardService.getDashboardStats();
    const monthlyIssuance = await cardService.getMonthlyCardIssuance();
    const recentRequests = await cardService.getRecentCardRequests();
    const statusDistribution = await cardService.getCardStatusDistribution();
    return responseHandler.success(
      res,
      "Dashboard",
      {
        stats,
        monthlyIssuance,
        recentRequests,
        statusDistribution,
      },
      200
    );
  } catch (error) {
    return responseHandler.error(res, error.message, 500);
  }
};
