const express = require("express");
const router = express.Router();
const expenseController = require("./expense.controller")

const { authentication } = require("../middlewares/authentication.middleware");

router.get("/expense", expenseController.getEkspenses);
router.get("/expense/:expenseId(\\d+)/", expenseController.getExpenseById);
router.post("/expense" , expenseController.createExpense)
router.delete("/expense/:expenseId(\\d+)/", expenseController.deleteExpense)

module.exports = router;
