const { GeneralError } = require("../exceptions/errors.exception");
const kategoriRepo = require("./kategori.repo");
const httpStatus = require("http-status-codes");

const getKategory = async () => {
  return await kategoriRepo.getKategory();
};

const getKategoryById = async (id) => {
  const kategori = await kategoriRepo.getKategoriById(id);
  if (!kategori) {
    throw new GeneralError("NOT_FOUND", httpStatus.StatusCodes.NOT_FOUND);
  }
  return kategori;
};

const createKategory = async (kategori) => {
  const data = {
    name: kategori.name,
    status: kategori.status,
  };
  return await kategoriRepo.createKategori(data);
};

const updateKategori = async (id, kategori) => {
  const data = {
    name: kategori.name,
    status: kategori.status,
  };
  try {
    return await kategoriRepo.updateKategori(id, data);
  } catch (error) {
    console.log(error);
  }
};

const deleteKategori = async (id) => {
  try {
    const kategori = await kategoriRepo.getKategoriById(id);
    const data = {
      name: kategori.name,
      status: false,
    };
    const rest = await updateKategori(id, data);
    return rest;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getKategory,
  getKategoryById,
  createKategory,
  updateKategori,
  deleteKategori,
};
