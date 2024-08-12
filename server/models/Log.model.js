const mongoose = require("mongoose")

const LogSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId, ref:"User"},
},{timestamps:true});

const Log = mongoose.model("Log", LogSchema);
module.exports = Log