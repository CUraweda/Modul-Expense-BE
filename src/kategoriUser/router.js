const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { getKategoryUser , getKategoriUserById, deleteKategoriUser, createKategoriUser, updateKategoriUser} = require("./kategoriUser.controller");

router.get("/kategori-user", getKategoryUser);
router.get("/kategori-user/:id(\\d+)/", getKategoriUserById);
router.post("/kategori-user", createKategoriUser);
router.delete("/kategori-user/:id(\\d+)/", deleteKategoriUser);
router.patch("/kategori-user/:id(\\d+)/", updateKategoriUser);

module.exports = router
