const express = require("express")
const { protect } = require("../middleware/authMiddleWare")
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require("../controlllers/chatControllers")

const router = express.Router()


router.route("/").post(protect,accessChat)
router.route("/").get(protect,fetchChats)
router.route("/group").post(protect,createGroupChat)
router.route("/rename").put(protect,renameGroup)
router.route("/groupremove").post(protect,removeFromGroup)
router.route("/groupadd").post(protect,addToGroup)


module.exports = router