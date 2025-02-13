const httpStatus = require("http-status-codes");
const { ValidationError } = require("../exceptions/errors.exception");
const expenseService = require("./expense.service");
const { addExpenseSchema } = require("./expense.schema");

const getEkspenses = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.params;

    // Jika startDate dan endDate ada, validasi format tanggal
    if ((startDate && !Date.parse(startDate)) || (endDate && !Date.parse(endDate))) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "Invalid date format. Use YYYY-MM-DD.",
      });
    }

    // Panggil service tanpa filter jika startDate atau endDate kosong
    const expense = await expenseService.getExpense(startDate || null, endDate || null);

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: expense,
      message: "sukses",
    });
  } catch (err) {
    console.error("Error in getEkspenses:", err);
    next(err);
  }
};



const getExpenseByKasir = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const expense = await expenseService.getExpenseByKasir(Number(userId));
    console.log(expense);
    
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: expense,
      message: "sukses",
    });
  } catch (err) {
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

    const expense = await expenseService.deleteExpense(Number(expenseId));
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
const getSummaryExpense = async (req, res, next) => {
  try {
    const { kategoriId } = req.params;
    const expense = await expenseService.getSumaryExpense(Number(kategoriId));
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
const updateStatusHandler = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { expenseId } = req.params;

    if (!status) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: httpStatus.BAD_REQUEST,
        message: "Status is required.",
      });
    }
    

    const expense = await expenseService.updateStatus(Number(expenseId), status);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: expense,
      message: "Success",
    });
  } catch (err) {
    console.error("Error in updateStatusHandler:", err);
    next(err);
  }
};

module.exports = {
  getEkspenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateStatusHandler,
  getExpenseByKasir,
  getSummaryExpense
};
