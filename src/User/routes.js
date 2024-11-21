const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");

const { authentication } = require("../middlewares/authentication.middleware");

router.post("/auth/login", authController.login);

// router.use(authentication)
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.get("/users/:userId(\\d+)/", userController.getUser);
router.delete("/users/:userId(\\d+)/", userController.deleteUser);
router.put("/users/:userId(\\d+)/", userController.updateUser);

module.exports = router;
