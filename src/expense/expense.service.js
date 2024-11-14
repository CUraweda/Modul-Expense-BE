const { GeneralError } = require("../exceptions/errors.exception");
const expenseRepo = require("./expense.repo");

const httpStatus = require("http-status-codes");

const getExpense = async () => {
  const expense = await expenseRepo.getExpenses();
  const expenseData = await Promise.all(
    expense.map((item) => {
      return data = {
        name : item.name,
        date : item.date,
        kategory : item.kategori.name,
        biaya : item.biaya,
        status: item.status,
        deskripsi : item.description,
        id: item.id,
        user: item.user.name
      }

    })
  )

  return expenseData
};

const getExpenseById = async (id) => {
  const expense = await expenseRepo.getExpenseById(id);
  if (!expense) {
    throw new GeneralError("NOT_FOUND", httpStatus.StatusCodes.NOT_FOUND);
  }
  return expense;
};

const createExpense = async (data) => {
  const expense = {
    name: data.name,
    date: data.date,
    kategoriId: data.kategoriId,
    userId: data.userId,
    description: data.description,
    biaya: data.biaya,
    status: data.status,
  };
  return await expenseRepo.createExpense(expense);
};

const updateExpense = async (data) => {
  const expense = {
    name: data.name,
    date: data.date,
    kategoryId: data.kategoryId,
    userId: data.userId,
    description: data.description,
    biaya: data.biaya,
    status: data.status,
  };
  return await expenseRepo.updateExpense(data.id, expense);
};

const deleteExpense = async (id) => {
    return await expenseRepo.deleteExpense(id);
}

module.exports = {getExpense, getExpenseById, createExpense, deleteExpense, updateExpense}