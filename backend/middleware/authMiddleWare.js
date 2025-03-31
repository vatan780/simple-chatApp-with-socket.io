const JWT = require("jsonwebtoken")
const USER = require("../models/userModels")

const protect = async (req,res,next)=>{
  try {

    let token

    // console.log('req.headers.authorization',req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]

        //decode Token

        decoded = JWT.verify(token,process.env.JWT_SECRET)

        req.user = await USER.findById(decoded.id).select("-passward")

        next()
    }

    if(!token){
        res.status(401).json({success:false ,message:"Not Authorized , No Token"})
    }

    
  } catch (error) {
    console.log("error in protect Middle ware=>",error.message)
    return res.status(500).json({success:false , message:"Not Authorized , TOken Failed"})
  }
}

module.exports = {protect}