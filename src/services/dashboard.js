const { Card } = require("../models");

exports.getDashboardStats = async () => {
  const totalCards = await Card.count();
  const activeCards = await Card.count({ where: { status: "active" } });
  const pendingCards = await Card.count({ where: { status: "pending" } });

  return { totalCards, activeCards, pendingCards };
};
