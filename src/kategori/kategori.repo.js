const prismaClient = require("../config/prisma.db");
const {
  GeneralError,
  ValidationError,
} = require("../exceptions/errors.exception");

const getKategory = async () => {
  return await prismaClient.kategori.findMany({
    where: {
      status : true
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getKategoriById = async (id) => {
  return await prismaClient.kategori.findUnique({ where: { id } });
};

const createKategori = async (data) => {
  try {
    const kategori = await prismaClient.kategori.create({ data });
    return kategori;
  } catch (error) {
    throw new ValidationError(error);
  }
};

const deleteKategori = async (id) => {
  return await prismaClient.kategori.delete({ where: { id } });
};

const updateKategori = async (id, data) => {
  try {
    return await prismaClient.kategori.update({ where: { id }, data });
  } catch (error) {
    throw new ValidationError(error);
  }
};

module.exports = {
  getKategory,
  getKategoriById,
  createKategori,
  deleteKategori,
  updateKategori,
};
