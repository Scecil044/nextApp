const { config } = require("dotenv");
const mongoose = require("mongoose")

const ConfigSchema = new mongoose.Schema({
    mailTrap:{
        type:Object,
        default:{
            trap:true,
            toEmails:["scecil072@gmail.com"],
            ccEmails:[]
        }
    },
    productCategories:[{type:String}],
    isDeleted:{type:Boolean, default:false},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    updatedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    deletedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
},{timestamps:true});

const SystemConfig = mongoose.model("SystemConfig", ConfigSchema);
module.exports = SystemConfig