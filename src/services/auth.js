const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { hashPassword, comparePassword } = require("../utils/passwordUtil");

const registerUser = async (email, password) => {
  try {
    const hashedPassword = await hashPassword(password);
    return await User.create({ email, password: hashedPassword });
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Re-throw the error after logging it
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return { token, user };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error; // Re-throw the error after logging it
  }
};

module.exports = { registerUser, loginUser };
