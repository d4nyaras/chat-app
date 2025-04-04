const express = require("express");
const {
  findChat,
  findUserChats,
  createChat,
} = require("../Controllers/ChatControllers");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findUserChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;
