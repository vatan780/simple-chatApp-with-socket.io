const USER = require("../models/userModels")
const CHAT = require("../models/chatModels");
const { default: mongoose } = require("mongoose");

// get one to one chat
const accessChat = async (req, res) => {
    try {

        const userId = req.body.userId;


        if (!userId) {
            return res.status(404).json({ message: "Missing UserID", success: false })
        }

        var isChat = await CHAT.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }).populate("users", "-password")
            .populate('latestMessage')


        isChat = await USER.populate(isChat, {
            path: "latestMessage.sender",
            select: "name email pic"

        })

        if (isChat?.length > 0) {
            return res.status(200).json({ success: true, message: "chat get Successfylly", data: isChat[0] });
        }
        else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId]
            }
        }

        const createdChat = await CHAT.create(chatData)
        const FullChat = await CHAT.findOne({ _id: createdChat._id }).populate("user", "-password")
        return res.status(200).json({ success: true, message: "chat Get Successfylly", data: FullChat })

    } catch (error) {
        console.log("error ==== in ===== accessChat", error.message)
        return res.status(500).json({ success: false, message: "Some Techniacl issue" })
    }
}


//get all chat of single user
const fetchChats = async (req, res) => {
    try {

        console.log("req.user._id ==============>", req.user._id)


        CHAT.find({
            // const result = await CHAT.find({
            users: [{
                $elemMatch: { $eq: req.user._id }
            }]
        })
            .populate("users", "-password")
            .populate("groupAdmin")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await USER.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email"
                });
                return res.status(200).json({ success: true, message: "Data Got Successfylly", data: results })
            });

        // return res.status(200).json({ success: true, message: "Data Got Successfylly", data: results })


    } catch (error) {
        console.log("error === in ====fetchChats", error.message)
        return res.status(500).json({ success: false, message: "Some Technical issue" })
    }

}

const createGroupChat = async (req, res) => {
    try {
        if (!req.body.users || !req.body.name) {
            return res.status(400).json({ success: false, message: "Please Fill All The Field..." })
        }

        var users = JSON.parse(req.body.users)

        if (users.length < 2) {
            return res.status(400).json({
                success: false,
                message: "More Than 2 User Required To Form a Group..."
            })
        }

        users.push(req.user)

        const groupChat = await CHAT.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const fullGroupChat = await CHAT.findOne({ _id: groupChat._id })
            .populate("users", '-password')
            .populate("groupAdmin", '-password')


        res.status(200).json({ success: true, message: "Group Created Successfylly...", data: fullGroupChat })

    } catch (error) {
        console.log("error in createGroupChat", error.message)
        return res.status(500).json({ success: false, message: "Some Technical issue" })
    }

}

const renameGroup = async (req, res) => {
    try {
        const { chatId, chatName } = req.body

        const updatedChat = await CHAT.findByIdAndUpdate(chatId, { chatName },
            {
                new: true
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!updatedChat) {
            return res.status(404).json({ success: false, message: "No Chat Found" })
        }
        else {
            return res.status(200).json({ success: true, message: "Chat Rename Successfylly", data: updatedChat })
        }
    } catch (error) {
        console.log("error in renameGroup ", error.message)
        return res.status(500).json({ success: false, message: "some technical issue" })
    }

}


const addToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body

        const updatedChat = await CHAT.findByIdAndUpdate(chatId,
            {
                $push: { users: userId }
            },
            {
                new: true
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!updatedChat) {
            return res.status(404).json({ success: false, message: "No Chat Found" })
        }
        else {
            return res.status(200).json({ success: true, message: "New User Added Successfylly", data: updatedChat })
        }
    } catch (error) {
        console.log("error in renameGroup ", error.message)
        return res.status(500).json({ success: false, message: "some technical issue" })
    }

}


const removeFromGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.body

        const removed = await CHAT.findByIdAndUpdate(chatId,
            {
                $pull: { users: userId }
            },
            {
                new: true
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!removed) {
            return res.status(404).json({ success: false, message: "No Chat Found" })
        }
        else {
            return res.status(200).json({ success: true, message: " User Removed Successfylly", data: removed })
        }
    } catch (error) {
        console.log("error in renameGroup ", error.message)
        return res.status(500).json({ success: false, message: "some technical issue" })
    }

}







module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }