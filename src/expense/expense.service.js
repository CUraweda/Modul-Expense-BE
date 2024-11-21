const { GeneralError } = require("../exceptions/errors.exception");
const expenseRepo = require("./expense.repo");

const httpStatus = require("http-status-codes");

const getExpense = async (startDate, endDate) => {
  // Jika startDate dan endDate kosong, panggil tanpa filter
  const expense = await expenseRepo.getExpenses(
    startDate || null,
    endDate || null
  );

  const expenseData = await Promise.all(
    expense.map((item) => {
      return {
        name: item.name,
        date: item.date,
        kategory: item.kategori.name,
        biaya: item.biaya,
        status: item.status,
        deskripsi: item.description,
        id: item.id,
        user: item.user.name,
        createdAt: item.createdAt,
      };
    })
  );

  return expenseData;
};
const getExpenseByKasir = async (userId) => {
  const expense = await expenseRepo.getExpensebyKasir(userId);

  const expenseData = await Promise.all(
    expense.map((item) => {
      return {
        name: item.name,
        date: item.date,
        kategory: item.kategori.name,
        biaya: item.biaya,
        status: item.status,
        deskripsi: item.description,
        id: item.id,
        user: item.user.name,
        createdAt: item.createdAt,
      };
    })
  );

  return expenseData;
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
    description: data.deskription,
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

const updateStatus = async (id, status) => {
  try {
    // Ensure the status is passed as an object with the correct property
    return await expenseRepo.updateExpense(id, { status });
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
const deleteExpense = async (id) => {
  return await expenseRepo.deleteExpense(id);
};
const getSumaryExpense = async () => {
  const sumarry = await expenseRepo.getExpensesSummary();
  const sumarryMount = await expenseRepo.getMonthlyExpensesSummary();
  return (dataRest = {
    totalCostToday: sumarry.totalDataToday.reduce(
      (total, expense) => total + expense.biaya,
      0
    ),
    totalCostThisMonth: sumarry.totalDataThisMonth.reduce(
      (total, expense) => total + expense.biaya,
      0
    ),
    totalExpenseThisMonth: sumarry.totalThisMonth,

    sumarryMount
  });
};

module.exports = {
  getExpense,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  updateStatus,
  getExpenseByKasir,
  getSumaryExpense,
};
