const cardService = require("../services/card");
const responseHandler = require("../utils/responseHandler");

exports.requestCard = async (req, res) => {
  try {
    const newCard = await cardService.requestCard(req.user.id);
    return responseHandler.success(
      res,
      "new Card added successfully",
      {
        newCard,
      },
      201
    );
  } catch (error) {
    return responseHandler.error(res, error.message, 400);
  }
};

exports.getCardProfile = async (req, res) => {
  try {
    console.log(req.user.id);
    const card = await cardService.getCardProfile(req.user.id, req.params.id);
    if (!card) return responseHandler.error(res, "Card not Found", 404);

    return responseHandler.success(
      res,
      "List of cards",
      {
        card,
      },
      200
    );
  } catch (error) {
    return responseHandler.error(res, error.message, 400);
  }
};
