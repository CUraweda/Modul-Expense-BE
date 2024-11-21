const express = require("express");
const router = express.Router();
const kategoriController = require("./kategori.controller");

const { authentication } = require("../middlewares/authentication.middleware");

router.get("/kategori", kategoriController.getKategory);
router.get("/kategori/:id(\\d+)/", kategoriController.getKategoriById);
router.post("/kategori", kategoriController.createKategori);
router.delete("/kategori/:id(\\d+)/", kategoriController.deleteKategori);
router.patch("/kategori/:id(\\d+)/", kategoriController.updateKategori);

module.exports = router
