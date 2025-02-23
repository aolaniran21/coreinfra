const { Card } = require("../models");

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
