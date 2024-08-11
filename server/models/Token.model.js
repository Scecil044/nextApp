const mongoose = require("mongoose")

const TokenSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    role:{type:mongoose.Schema.Types.ObjectId, ref:"Role"},
    type:{type:String, required:true, trim:true},
    isBlackListed:{type:Boolean, default:false},
    expires:{type:Date, default:Date.now()},
    token:{type:String, required: true},
    isDeleted:{type:Boolean, default:false},
},{timestamps:true})

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;
