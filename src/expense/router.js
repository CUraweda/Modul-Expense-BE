const express = require("express");
const router = express.Router();
const expenseController = require("./expense.controller");

const { authentication } = require("../middlewares/authentication.middleware");

router.get("/expense/:startDate/:endDate", expenseController.getEkspenses);
router.get("/expense", expenseController.getEkspenses);
router.get("/expense-summary", expenseController.getSummaryExpense);
router.get("/expense-kasir/:userId(\\d+)/", expenseController.getExpenseByKasir);
router.get("/expense/:expenseId(\\d+)/",expenseController.getExpenseById);
router.post("/expense", expenseController.createExpense);
router.delete("/expense/:expenseId(\\d+)/",  expenseController.deleteExpense);
router.patch("/expense/status/:expenseId(\\d+)/",expenseController.updateStatusHandler);

module.exports = router;
