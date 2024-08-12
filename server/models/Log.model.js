const mongoose = require("mongoose")

const LogSchema = new mongoose.Schema({

},{timestamps:true});

const Log = mongoose.model("Log", LogSchema);
module.exports = Log