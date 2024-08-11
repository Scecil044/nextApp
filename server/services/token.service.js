const jwt = require("jsonwebtoken");
const { Token } = require("../models");
const  userService  = require("./user.service");
const { tokenTypes } = require("../config/tokenTypes");
const moment = require("moment")

const saveToken = async(newToken, type, userId, expires)=>{
    return await Token.create({
        expires,
        user:userId,
        type,
        token:newToken,
        isBlackListed:false,
    })
}

const generateToken = async(user, type, expires) => {
    const payLoad = {
        _id:user._id,
        roleId:user.role,
        iat:moment().unix(),
        exp:expires.unix(),
        type:type
    }
    return jwt.sign(payLoad, process.env.JWT_SECRET)
}

const verifyToken = async(token, type)=>{
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenPayload, "this is the payload")
    const tokenDoc = await Token.findOne({isDeleted:false, user:tokenPayload._id, token:token, isBlackListed:false});
    if(!tokenDoc) throw new Error("Token not found! Not Authorized!")
    return tokenDoc;
}


const generatePasswordResetToken = async(reqBody) =>{
    const isUser = await userService.getUserByEmail(email);
    if(!isUser) throw new Error('Invalid email address!');

    const expires = moment().add(process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES, "minutes").toDate();
    const newToken = await generateToken(isUser,tokenTypes.RESET, expires);
    await saveToken(newToken, tokenTypes.RESET, user._id, expires);
    return newToken
}

module.exports = {
    verifyToken,
    generatePasswordResetToken,
}