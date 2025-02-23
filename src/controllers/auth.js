const { registerUser, loginUser } = require("../services/auth");
const responseHandler = require("../utils/responseHandler");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    return responseHandler.success(
      res,
      "User registered successfully",
      {
        user,
      },
      201
    );
  } catch (error) {
    return responseHandler.error(res, error.message, 400);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await loginUser(email, password);
    return responseHandler.success(
      res,
      "Login successful",
      {
        token,
        user,
      },
      200
    );
  } catch (error) {
    return responseHandler.error(res, error.message, 401);
  }
};

module.exports = { register, login };
