const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    business:{type:mongoose.Schema.Types.ObjectId, ref:"Business"},
    title:{type:String, required:true},
    images:[{type:String, default:[]}],
    price:{type:Number, required:true},
    quantity:{type:Number, default:1},
    category:{type:String},
    size:{type:String},
    color:{type:String},
    isOnOffer:{type:Boolean, default:false},
    isOnFlashSale:{type:Boolean, default:false},
    shortDescription:{type:String, required:true},
    longDescription:{type:String},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    updatedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    deletedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    isDeleted:{type:Boolean, default:false},
}, {timestamps:true});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;