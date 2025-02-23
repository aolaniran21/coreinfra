const { Card, sequelize } = require("../models");

exports.getDashboardStats = async () => {
  try {
    const totalCards = await Card.count();
    const activeCards = await Card.count({ where: { status: "active" } });
    const pendingCards = await Card.count({ where: { status: "pending" } });

    return { totalCards, activeCards, pendingCards };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error; // Re-throw the error after logging it
  }
};

exports.requestCard = async (userId) => {
  try {
    return await Card.create({
      userId,
      status: "pending",
      cardNumber: Math.random().toString(36).substr(2, 12),
    });
  } catch (error) {
    console.error("Error requesting card:", error);
    throw error; // Re-throw the error after logging it
  }
};

exports.getCardProfile = async (userId, cardId) => {
  try {
    return await Card.findOne({ where: { id: cardId, userId } });
  } catch (error) {
    console.error("Error fetching card profile:", error);
    throw error; // Re-throw the error after logging it
  }
};

exports.getAllCards = async () => {
  try {
    return await Card.findAll();
  } catch (error) {
    console.error("Error fetching all cards:", error);
    throw error; // Re-throw the error after logging it
  }
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
