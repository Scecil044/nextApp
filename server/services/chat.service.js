const userService = require("./user.service");
const { Chat } = require("../models");
const mongoose = require("mongoose");

const isMember = (chat, senderId) => {
  return (
    chat.participants.some(p => p.toString() === senderId.toString()) ||
    chat.messages.some(m => m.sender.toString() === senderId.toString())
  );
};

const findChatById = async chatId => {
  return await Chat.findOne({ isDeleted: false, _id: chatId });
};

const createChat = async (userIds, userId) => {
  if (!Array.isArray(userIds)) {
    userIds = [userIds];
  }
  // Add userId to the list of participants if it's not already included
  if (!userIds.includes(userId)) {
    userIds.unshift(userId.toString());
  }
  for (let id of userIds) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`The provided id: ${id} Is not a valid mongo id`);
    }
  }

  // Sort and format user IDs for comparison
  const sortedUserIds = userIds.map(id => id.toString()).sort();

  // Check if a similar chat already exists
  const isExistingChat = await Chat.findOne({
    isDeleted: false,
    participants: { $all: sortedUserIds },
    $expr: { $eq: [{ $size: "$participants" }, sortedUserIds.length] } // Ensure the number of participants matches
  });

  if (isExistingChat) {
    return isExistingChat.populate("participants", "firstName lastName email image_url");
  }
  const newChat = await Chat.create({
    participants: userIds
  });

  return newChat.populate("participants", "firstName lastName email image_url");
};

const sendMessage = async reqBody => {
  const { chatId, senderId, content } = reqBody;
  console.log(senderId);

  const isChat = await findChatById(chatId);
  if (!isChat) throw new Error(`Could not find chat with provided id : ${chatId}`);

  const isUser = await userService.getUserById(senderId);
  if (!isUser) throw new Error(`Could not find sender with provided id : ${senderId}`);

  // Check if senderId is one of the participants or listed as the sender in the messages
  const isParticipantOrSender =
    isChat.participants.some(p => p.toString() === senderId.toString()) ||
    isChat.messages.some(m => m.sender.toString() === senderId.toString());

  if (!isParticipantOrSender) {
    throw new Error(`User with id: ${senderId} is not a participant or sender in the chat`);
  }

  // create message body
  const message = {
    sender: senderId,
    content: content,
    timestamp: Date.now()
  };
  isChat.messages.push(message);
  isChat.lastMessage = content;
  isChat.lastMessageTime = Date.now();

  await isChat.save();
  return isChat.populate([
    { path: "messages.sender", select: "firstName lastName image_url email" },
    { path: "participants", select: "firstName lastName image_url email" }
  ]);
};

const getChatMessages = async chatId => {
  const chat = await Chat.findById(chatId).populate("messages.sender", "firstName lastName");
  if (!chat) {
    throw new Error(`Chat with ID ${chatId} not found.`);
  }

  return chat.messages;
};

// const getUserChats = async (reqBody) => {
//   const { userId } = reqBody;

//   const isUser = await userService.getUserById(userId);
//   if (!isUser) throw new Error(`Could not find user with provided id: ${userId}`);

//   const chats = await Chat.find({
//     isDeleted: false,
//     $or: [{ participants: userId }, { "messages.sender": userId }]
//   })
//     .populate("participants", "firstName lastName middleName image_url");

//   return chats;
// };

const getUserChats = async reqBody => {
  const { userId } = reqBody;

  // Check if the user exists
  const isUser = await userService.getUserById(userId);
  if (!isUser) throw new Error(`Could not find user with provided id: ${userId}`);

  // Find chats where the user is a participant or has sent a message
  const chats = await Chat.find({
    isDeleted: false,
    $or: [{ participants: userId }, { "messages.sender": userId }]
  })
    .populate("participants", "firstName lastName middleName image_url")
    .populate({
      path: "messages.sender",
      select: "firstName lastName image_url email"
    });

  // Filter out deleted messages from each chat
  const filteredChats = chats.map(chat => {
    return {
      ...chat.toObject(),
      messages: chat.messages.filter(m => !m.isDeleted)
    };
  });

  return filteredChats;
};

const deleteMessage = async reqBody => {
  const { chatId, messageId, userId } = reqBody;
  const isChat = await findChatById(chatId);
  if (!isChat) throw new Error(`Could not find chat with provided id : ${chatId}`);

  // Check if the message exists in this chat
  const message = isChat.messages.find(m => m._id.toString() === messageId);
  if (!message) throw new Error(`Invalid message Id ${messageId}. This message is not listed in this chat`);

  // Check if the userId matches the senderId of the message
  if (message.sender.toString() !== userId.toString()) {
    throw new Error(`User with id: ${userId} is not authorized to delete this message`);
  }

  // Mark the message as deleted
  message.isDeleted = true;

  // Save the updated chat
  await isChat.save();
  // Populate the sender and participants fields
  await isChat.populate([
    { path: "messages.sender", select: "firstName lastName image_url email" },
    { path: "participants", select: "firstName lastName image_url email" }
  ]);

  // Filter out messages with isDeleted: true before returning
  const filteredMessages = isChat.messages.filter(m => !m.isDeleted);

  return {
    ...isChat.toObject(),
    messages: filteredMessages
  };
};

const updateMessage = async reqBody => {
 try {
    const { chatId, messageId, content, userId } = reqBody;
    const isChat = await findChatById(chatId);
    if (!isChat) throw new Error(`Could not find chat with provided id: ${chatId}`);
  
    if(!isMember(isChat, userId)){
      throw new Error(`you cannot update this message`)
    }
    const messageToUpdate = isChat.messages.find(m => m._id.toString() === messageId.toString());
  
    console.log(messageToUpdate)
    if (!messageToUpdate) throw new Error(`Illegal operation! Message is inexistant!`);
    if(messageToUpdate.sender.toString() !== userId.toString()) throw new Error(`Only senders can update their individual messages!`);
    
    messageToUpdate.content = content;
    await isChat.save();
  
    isChat.populate([
      { path: "participants", select: "firstName lastName image_url" },
      { path: "messages.sender", select: "firstName lastName image_url" }
    ]);
    // Filter messages with isDeleted: true
    const filteredMessages = isChat.messages.filter(m => !m.isDeleted);
  
    return {
      ...isChat.toObject(),
      messages: filteredMessages
    };
 } catch (error) {
    console.log(error)
 }
};

const deleteChat = async reqBody => {
  const { chatId, userId } = reqBody;

  const isChat = await findChatById(chatId);
  if (!isChat) throw new Error(`Could not find chat with provided id: ${chatId}`);

  const isParticipantOrIsSender =
    isChat.participants.some(p => p.toString() === userId.toString()) ||
    isChat.messages.some(m => m.sender.toString() === userId.toString());

  if (!isParticipantOrIsSender) {
    throw new Error(`You do not have exclusive rights to delete this chat!`);
  }

  const firstMessage = isChat.messages[0];
  if (firstMessage && firstMessage.sender.toString() !== userId.toString()) {
    throw new Error(`You are not the sender of the first message in this chat!`);
  }

  isChat.isDeleted = true;

  await isChat.save();

  return isChat;
};

module.exports = {
  createChat,
  sendMessage,
  findChatById,
  getUserChats,
  getChatMessages,
  deleteMessage,
  deleteChat,
  updateMessage
};
