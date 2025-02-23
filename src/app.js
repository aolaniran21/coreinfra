require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { sequelize } = require("./models");

// Import Routes
const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/card");
const dashboardRoutes = require("./routes/dashboard");

// Initialize Swagger Docs
const swagger = require("./utils/swagger");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api", dashboardRoutes);

// Swagger Documentation
swagger(app);
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");
    // return sequelize.sync({ alter: true });
  })
  .then(() => console.log("🔄 Database synchronized"))
  .catch((err) => console.error("❌ Database connection failed:", err));
// Root Endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the Card Management API 🚀");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
