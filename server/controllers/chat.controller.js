const httpStatus = require("http-status")
const errorHandler = require("../middlewares/errorHandler")
const { chatService } = require("../services")

const sendMessage = async(req, res,next)=>{
    try {
        const body = {...req.body, senderId:req.user._id};
  
        const response = await chatService.sendMessage(body)
        if(!response) return next(errorHandler(httpStatus.BAD_REQUEST, "unable to  send message!"));
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        next(error)
    }
}

const createChat = async(req, res,next)=>{
    try {
        const response = await chatService.createChat(req.body.userIds, req.user._id)
        if(!response) return next(errorHandler(httpStatus.BAD_REQUEST, "unable to create chat!"));
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        next(error)
    }
}
const getUserChats = async(req, res,next)=>{
    try {
        const response = await chatService.getUserChats(req.body)
        if(!response) return next(errorHandler(httpStatus.BAD_REQUEST, "unable to get user chats!"));
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        next(error)
    }
}
const getChat = async(req, res,next)=>{
    try {
        const response = await chatService.getChatMessages(req.params.chatId)
        if(!response) return next(errorHandler(httpStatus.BAD_REQUEST, "unable to get chat messages!"));
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        next(error)
    }
}

const deleteChat = async(req, res,next)=>{
    try {
        const body = {...req.body, userId: req.user._id}
        const response = await chatService.deleteChat(body)
        if(!response) return next(errorHandler(httpStatus.BAD_REQUEST, "unable to delete chat!"));
        res.status(httpStatus.OK).json(`Chat deleted`)
    } catch (error) {
        next(error);
    }
}

const deleteMessage = async(req, res,next)=>{
    try {
        const body = {...req.body, userId: req.user._id}
        const response = await chatService.deleteMessage(body)
        if(!response) return next(errorHandler(httpStatus.BAD_REQUEST, "unable to delete message!"));
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        next(error);
    }
}

const updateMessage = async(req, res,next)=>{
    try {
        const body = {...req.body, userId: req.user._id}
        const response = await chatService.updateMessage(body)
        if(!response) return next(errorHandler(httpStatus.BAD_REQUEST, "unable to update message!"));
        res.status(httpStatus.OK).json(response)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createChat,
    sendMessage,
    getUserChats,
    getChat,
    deleteChat,
    deleteMessage,
    updateMessage
}