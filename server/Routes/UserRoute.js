const express = require("express");
const { getAllUsers } = require("../Controllers/UserControllers");

const router = express.Router();

router.get("/", getAllUsers);

module.exports = router;
