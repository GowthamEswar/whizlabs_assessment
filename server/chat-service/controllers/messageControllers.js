const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

//@description     Get all Messages
//@route           GET /api/message/:chatId
//@access          Protected
exports.getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate('chat', 'chatName')
      .exec();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

//@description     Create New Message
//@route           POST /api/message/
//@access          Protected
exports.sendMessage = asyncHandler(async (req, res) => {
  console.log("sender-->", req.body)
  const { content, chatId } = req.body;
  const sender = req.user; // Assuming `req.user` contains sender details

  console.log("sender-->", sender)

  if (!content || !chatId) {
    return res.status(400).json({ message: 'Content and chatId are required' });
  }

  try {
    const message = await Message.create({
      sender: {
        _id: sender.user_id,
        name: sender.name,
        email: sender.email,
      },
      content,
      chat: chatId,
    });

    // Update latestMessage in chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});
