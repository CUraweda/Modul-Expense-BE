const httpStatus = require("http-status-codes");
const { ValidationError } = require("../exceptions/errors.exception");
const expenseService = require("./expense.service");
const { addExpenseSchema } = require("./expense.schema");

const getEkspenses = async (req, res, next) => {
  try {
    const expense = await expenseService.getExpense();
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: expense,
      message: "sukses",
    });
  } catch (err) {
    console.log(err);
    
    next(err);
  }
};

const getExpenseById = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const expense = await expenseService.getExpenseById(expenseId);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: expense,
      message: "sukses",
    });
  } catch (err) {
    next(err);
  }
};

const createExpense = async (req, res, next) => {
  try {
    const { error, value } = addExpenseSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ValidationError(error.details);
    }

    const expense = await expenseService.createExpense(value);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: expense,
      message: "sukses",
    });
  } catch (err) {
    console.log(err);
    
    next(err);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const expense = await expenseService.deleteExpense(expenseId);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: expense,
      message: "sukses",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {getEkspenses, getExpenseById, createExpense, deleteExpense};