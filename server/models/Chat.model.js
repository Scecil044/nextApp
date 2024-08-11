const mongoose = require("mongoose")

const MessagesSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, default: '' },
    isRead: { type: Boolean, default: false },  
    isDeleted:{type:Boolean, default:false}
}, { timestamps: true });

const ChatSchema = new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
    }],
    messages:[MessagesSchema],
    lastMessage:{type:String, default:""},
    lastMessageTime:{type:Date, default:Date.now},
    isDeleted:{type:Boolean, default:false},
},{timestamps:true});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;