const express = require("express");
const { chatController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const { chatValidations } = require("../../validations");
const verifyToken = require("../../middlewares/verifyToken");

const router = express.Router()

router.get("/:chatId", verifyToken, validate(chatValidations.getChat), chatController.getChat)
router.get("/my/chats", verifyToken, validate(chatValidations.getUserChats), chatController.getUserChats)
router.post("/",verifyToken,validate(chatValidations.createChat), chatController.createChat);
router.post("/send/message",verifyToken,validate(chatValidations.sendMessage), chatController.sendMessage);
router.put("/update/message",verifyToken,validate(chatValidations.updateMessage), chatController.updateMessage);
router.delete("/delete/message",verifyToken,validate(chatValidations.deleteMessage), chatController.deleteMessage);
router.delete("/delete/chat",verifyToken,validate(chatValidations.deleteChat), chatController.deleteChat);
module.exports = router