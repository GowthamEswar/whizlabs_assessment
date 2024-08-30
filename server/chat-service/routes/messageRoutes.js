const express = require("express");
const {
  getMessages,
  sendMessage,
} = require("../controllers/messageControllers");
const { VerifyToken } = require("../controllers/verifyToken");

const router = express.Router();

router.route("/:chatId").get(VerifyToken, getMessages);
router.route("/").post(VerifyToken, sendMessage);

module.exports = router;
