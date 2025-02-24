const express = require("express");
const { getDashboard } = require("../controllers/dashboard");

const router = express.Router();

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Cards]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Dashboard"
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         totalCards:
 *                           type: integer
 *                           example: 2
 *                         activeCards:
 *                           type: integer
 *                           example: 1
 *                         pendingCards:
 *                           type: integer
 *                           example: 1
 *                     monthlyIssuance:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-02-01T00:00:00.000Z"
 *                           count:
 *                             type: integer
 *                             example: 2
 *                     recentRequests:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           userId:
 *                             type: integer
 *                             example: 2
 *                           status:
 *                             type: string
 *                             example: "pending"
 *                           cardNumber:
 *                             type: string
 *                             example: "987654321098"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-02-23T15:08:21.190Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-02-23T15:08:21.190Z"
 *                     statusDistribution:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           status:
 *                             type: string
 *                             example: "active"
 *                           count:
 *                             type: integer
 *                             example: 1
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get("/dashboard", getDashboard);

module.exports = router;
