const httpStatus = require("http-status-codes");
const { ValidationError } = require("../exceptions/errors.exception");
const kategoriUserService = require("./kategoriUser.service");
const { addKategoriSchema } = require("./kategoriUser.schema");

const getKategoryUser = async (req, res, next) => {
  try {
    const kategori = await kategoriUserService.getKategoryUser();
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: kategori,
      message: "sukses",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getKategoriUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const kategori = await kategoriUserService.getKategoryUserById(Number(id));
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: kategori,
      message: "sukses",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const createKategoriUser = async (req, res, next) => {
  try {
    const { error, value } = addKategoriSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ValidationError(error.details);
    }

    const kategori = await kategoriUserService.createKategoryUser(value);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: kategori,
      message: "sukses",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const deleteKategoriUser = async (req, res, next) => {
 
  try {
    const { id } = req.params;
    const kategori = await kategoriUserService.deleteKategoriUser(Number(id));
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: kategori,
      message: "sukses",
    });
    
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const updateKategoriUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = addKategoriSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ValidationError(error.details);
    }

    const kategori = await kategoriUserService.updateKategoriUser(Number(id), value);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: kategori,
      message: "sukses",
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = {
  getKategoryUser,
  getKategoriUserById,
  createKategoriUser,
  deleteKategoriUser,
  updateKategoriUser,
};
