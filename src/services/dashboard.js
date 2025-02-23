const { Card } = require("../models");
const { sequelize } = require("sequelize");

exports.getDashboardStats = async () => {
  const totalCards = await Card.count();
  const activeCards = await Card.count({ where: { status: "active" } });
  const pendingCards = await Card.count({ where: { status: "pending" } });

  return { totalCards, activeCards, pendingCards };
};

exports.getMonthlyCardIssuance = async () => {
  const monthlyIssuance = await Card.findAll({
    attributes: [
      [
        sequelize.fn("date_trunc", "month", sequelize.col("createdAt")),
        "month",
      ],
      [sequelize.fn("count", sequelize.col("id")), "count"],
    ],
    group: ["month"],
    order: [["month", "ASC"]],
  });
  return monthlyIssuance;
};

exports.getRecentCardRequests = async (limit = 10) => {
  const recentRequests = await Card.findAll({
    order: [["createdAt", "DESC"]],
    limit,
  });
  return recentRequests;
};

exports.getCardStatusDistribution = async () => {
  const statusDistribution = await Card.findAll({
    attributes: [
      "status",
      [sequelize.fn("count", sequelize.col("id")), "count"],
    ],
    group: ["status"],
  });
  return statusDistribution;
};
