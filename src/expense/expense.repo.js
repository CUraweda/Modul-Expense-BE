const prismaClient = require("../config/prisma.db");
const {
  GeneralError,
  ValidationError,
} = require("../exceptions/errors.exception");

const getExpenses = async (startDate, endDate) => {
  const whereClause = {};

  // Tambahkan filter createdAt hanya jika startDate dan endDate diberikan
  if (startDate && endDate) {
    whereClause.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  }

  return await prismaClient.expense.findMany({
    where: whereClause,
    include: {
      user: true,
      kategori: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
const getExpensebyKasir = async (userId) => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  return await prismaClient.expense.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    include: {
      user: true,
      kategori: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getExpenseById = async (id) => {
  return await prismaClient.expense.findUnique({ where: { id } });
};

const createExpense = async (expense) => {
  try {
    const createExpense = await prismaClient.expense.create({ data: expense });
    return createExpense;
  } catch (error) {
    throw new ValidationError(error);
  }
};

const deleteExpense = async (id) => {
  return await prismaClient.expense.delete({
    where: {
      id: id,
    },
  });
};

const updateExpense = async (id, expense) => {
  try {
    return await prismaClient.expense.update({
      where: { id: id },
      data: expense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
  }
};

const getExpensesSummary = async () => {
  const today = new Date();

  // Awal dan akhir hari ini
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  // Awal dan akhir bulan ini
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Total data hari ini
  const totalDataToday = await prismaClient.expense.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  // Total data bulan ini
  const totalDataThisMonth = await prismaClient.expense.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
  const totalThisMonth = await prismaClient.expense.count({
    where: {
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  return {
    totalDataToday,
    totalDataThisMonth,
    totalThisMonth,
  };
};

const getMonthlyExpensesSummary = async () => {
  const year = new Date().getFullYear();

  // Array untuk menyimpan hasil
  const totalExpenses = Array(12).fill(0);
  const totalApprovedExpenses = Array(12).fill(0);
  const totalRejectedExpenses = Array(12).fill(0);

  for (let month = 0; month < 12; month++) {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    // Total expense untuk bulan ini
    const totalExpense = await prismaClient.expense.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    // Total expense dengan status "Disetujui"
    const totalApprovedExpense = await prismaClient.expense.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        status: "Disetujui",
      },
    });

    // Total expense dengan status "Ditolak"
    const totalRejectedExpense = await prismaClient.expense.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        status: "Ditolak",
      },
    });

    totalExpenses[month] =
      totalExpense.reduce((total, expense) => total + expense.biaya, 0) || 0;
    totalApprovedExpenses[month] =
      totalApprovedExpense.reduce(
        (total, expense) => total + expense.biaya,
        0
      ) || 0;
    totalRejectedExpenses[month] =
      totalRejectedExpense.reduce(
        (total, expense) => total + expense.biaya,
        0
      ) || 0;
  }

  return {
    totalExpenses,
    totalApprovedExpenses,
    totalRejectedExpenses,
  };
};

module.exports = {
  getExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense,
  createExpense,
  getExpensebyKasir,
  getExpensesSummary,
  getMonthlyExpensesSummary,
};
