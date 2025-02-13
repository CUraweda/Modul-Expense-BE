const prismaClient = require("../config/prisma.db");
const {
  GeneralError,
  ValidationError,
} = require("../exceptions/errors.exception");

const getKategoryUser = async () => {
  return await prismaClient.kategoriUser.findMany();
};

const getKategoriUserById = async (id) => {
  return await prismaClient.kategoriUser.findUnique({ where: { id } });
};

const createKategoriUser = async (data) => {
  try {
    const kategori = await prismaClient.kategoriUser.create({ data });
    return kategori;
  } catch (error) {
    throw new ValidationError(error);
  }
};

const deleteKategoriUser = async (id) => {
  return await prismaClient.kategoriUser.delete({ where: { id } });
};

const updateKategoriUser = async (id, data) => {
  try {
    return await prismaClient.kategoriUser.update({ where: { id }, data });
  } catch (error) {
    throw new ValidationError(error);
  }
};

module.exports = {
  getKategoryUser,
  getKategoriUserById,
  createKategoriUser,
  deleteKategoriUser,
  updateKategoriUser,
};
