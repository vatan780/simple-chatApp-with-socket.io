const USER = require("../models/userModels")
const generateToken = require('../config/jsonWebToken')

const registerUser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body

        if (!name || !email || !password) {
            res.status(400).json({ status: 400, message: "Missing Field Required", success: false })
        }

        const userExist = await USER.findOne({ email: email })

        if (userExist) {
            return res.status(400).json({ status: 400, message: "User Email Already Exist", success: false })
        }

        const user = await USER.create({
            name: name,
            email: email,
            pic: pic,
            password: password
        })

        if (user) {
            return res.status(201).json({
                status: 201,
                message: "User Account Created Successfully...",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id)
                },
                success: true
            })
        }


    } catch (error) {
        console.log("error message", error.message)
        return res.status(500).json({ success: false, message: "Some thing went Wrong in user Registerr", })

    }
}


const authUser = async (req, res) => {
    try {
        const { email, password, } = req.body

        if (!email || !password) {
            res.status(400).json({ status: 400, message: "Missing Field Required", success: false })
        }

        let user = await USER.findOne({ email })

        if (user && await user.matchPassword(password)) {
            return res.status(201).json({
                status: 201,
                message: "User  Log In Successfully...",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id)
                },
                success: true
            })
        }


    } catch (error) {
        console.log("error message", error.message)
        return res.status(500).json({ success: false, message: "Some thing went Wrong in user Login", })

    }
}


module.exports = { registerUser, authUser }