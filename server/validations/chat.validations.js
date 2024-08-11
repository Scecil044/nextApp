const Joi = require("joi");
const {objectId} = require("./custom.validations")

const createChat = {
    body: Joi.object().keys({
        userIds: Joi.array().items(objectId).required()
    })
}
const sendMessage = {
    body: Joi.object().keys({
        content:Joi.string().required(),
        chatId:objectId().required(),
    })
}

const getChat = {
    params:Joi.object().keys({
        chatId:objectId().required()
    })
}

const getUserChats = {
    body:Joi.object().keys({
        userId:objectId().required()
    })
}

const deleteMessage = {
    body:Joi.object().keys({
        messageId:objectId().required(),
        chatId:objectId().required(),
    })
}

const deleteChat = {
    body:Joi.object().keys({
        chatId:objectId().required(),
    })
}
const updateMessage = {
    body:Joi.object().keys({
        chatId:objectId().required(),
        messageId:objectId().required(),
        content:Joi.string()
    })
}

module.exports = {
    createChat, sendMessage, getChat, getUserChats, deleteMessage, deleteChat, updateMessage
}