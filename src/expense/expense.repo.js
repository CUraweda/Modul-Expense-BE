const prismaClient = require("../config/prisma.db");
const {
  GeneralError,
  ValidationError,
} = require("../exceptions/errors.exception");

const getExpenses = async () => {
  return await prismaClient.expense.findMany({
    include: {
        user: true,
        kategori: true,
    }
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
}

const deleteExpense = async (id) => {
    return await prismaClient.expense.delete({
        where: {
            id: id
        }
    })
}

const updateExpense = async (id, expense) => {
    try {
        return await prismaClient.expense.update({
            where: { id },
            data: expense
        })
    } catch (error) {
        
    }
}

module.exports = {getExpenses, getExpenseById, deleteExpense, updateExpense, createExpense}