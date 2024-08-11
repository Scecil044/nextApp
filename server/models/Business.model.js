const mongoose = require("mongoose")

contactPersonSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
});

const BusinessSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    contact_persons:[contactPersonSchema],
    name: {type:String, required:true, trim:true},
    logo: {type:String, default:"", trim:true},
    location:{
        type:Object,
        default:{
            address:"",
            town:"",
            street:"",
            building:"",
            country:"Kenya"
        }
    },
    metaData:{
        type:Object,
        default:{
            phone:"",
            email:"",
            category:""
        }
    },
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    updatedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    deletedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    isDeleted:{type:Boolean, default:false},
}, {timestamps:true});

const Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;