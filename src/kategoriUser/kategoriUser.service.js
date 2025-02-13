const { GeneralError } = require("../exceptions/errors.exception");
const kategoriUserRepo = require("./kategoriUser.repo");
const httpStatus = require("http-status-codes");

const getKategoryUser = async () => {
  return await kategoriUserRepo.getKategoryUser();
};

const getKategoryUserById = async (id) => {
  const kategori = await kategoriUserRepo.getKategoriUserById(id);
  if (!kategori) {
    throw new GeneralError("NOT_FOUND", httpStatus.StatusCodes.NOT_FOUND);
  }
  return kategori;
};

const createKategoryUser = async (kategori) => {
  return await kategoriUserRepo.createKategoriUser(kategori);
};

const updateKategoriUser = async (id, kategori) => {
 
  try {
    return await kategoriUserRepo.updateKategoriUser(id, kategori);
  } catch (error) {
    console.log(error);
  }
};

const deleteKategoriUser = async (id) => {
  try {
    const kategori = await kategoriUserRepo.deleteKategoriUser(id);
    return kategori;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getKategoryUser,
 getKategoryUserById,
 createKategoryUser,
 updateKategoriUser,
 deleteKategoriUser
};
