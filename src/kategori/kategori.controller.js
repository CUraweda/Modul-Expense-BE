const httpStatus = require("http-status-codes");
const { ValidationError } = require("../exceptions/errors.exception");
const kategoriService = require("./kategori.service");
const { addKategoriSchema } = require("./kategori.schema");

const getKategory = async (req, res, next) => {
  try {
    const kategori = await kategoriService.getKategory();
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

const getKategoriById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const kategori = await kategoriService.getKategoryById(Number(id));
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

const createKategori = async (req, res, next) => {
  try {
    const { error, value } = addKategoriSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ValidationError(error.details);
    }

    const kategori = await kategoriService.createKategory(value);
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

const deleteKategori = async (req, res, next) => {
 
  try {
    const { id } = req.params;
    const kategori = await kategoriService.deleteKategori(Number(id));
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

const updateKategori = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = addKategoriSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new ValidationError(error.details);
    }

    const kategori = await kategoriService.updateKategori(Number(id), value);
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
  getKategory,
  getKategoriById,
  createKategori,
  deleteKategori,
  updateKategori,
};
