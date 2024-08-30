const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { VerifyToken } = require("../controllers/verifyToken");

const router = express.Router();

router.route("/").post(VerifyToken, accessChat);
router.route("/").get(VerifyToken, fetchChats);
router.route("/group").post(VerifyToken, createGroupChat);
router.route("/rename").put(VerifyToken, renameGroup);
router.route("/groupremove").put(VerifyToken, removeFromGroup);
router.route("/groupadd").put(VerifyToken, addToGroup);

module.exports = router;
