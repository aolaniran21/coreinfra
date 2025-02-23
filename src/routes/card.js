const express = require("express");
const auth = require("../middlewares/auth");
const { requestCard, getCardProfile } = require("../controllers/card");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - userId
 *         - status
 *         - cardNumber
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the card
 *         userId:
 *           type: integer
 *           description: ID of the user requesting the card
 *         status:
 *           type: string
 *           enum: [pending, active, blocked]
 *           description: Status of the card
 *         cardNumber:
 *           type: string
 *           description: The unique card number
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the card was created
 *       example:
 *         id: "d5fE_asz"
 *         userId: 1
 *         status: "active"
 *         cardNumber: "1234567890123456"
 *         createdAt: "2025-02-20T04:05:06.157Z"
 *
 * tags:
 *   - name: Cards
 *     description: API for managing cards
 */

/**
 * @swagger
 * /api/cards/request:
 *   post:
 *     summary: Request a new card
 *     tags: [Cards]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: ID of the user requesting the card
 *     responses:
 *       201:
 *         description: Card requested successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Card"
 *       400:
 *         description: Invalid request data.
 */
router.post("/request", auth, requestCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   get:
 *     summary: Get card details
 *     tags: [Cards]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the card to retrieve
 *     responses:
 *       200:
 *         description: Card details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Card"
 *       404:
 *         description: Card not found.
 *       400:
 *         description: Invalid card ID.
 */
router.get("/:id", auth, getCardProfile);

module.exports = router;
