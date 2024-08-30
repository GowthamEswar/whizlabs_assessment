const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");

// @description     Create or fetch One to One Chat
// @route           POST /api/chat/
// @access          Protected
const accessChat = asyncHandler(async (req, res) => {
  const { userId, toName, toEmail } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  // Find existing chat
  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [
      { _id: req.user.user_id, name: req.user.name, email: req.user.email },
      { _id: userId, name: toName, email: toEmail }
    ] }
  }).populate("latestMessage");

  if (chat) {
    return res.json(chat);
  }

  console.log("req----->", chat)

  // Create new chat
  const chatData = {
    chatName: toName,
    isGroupChat: false,
    users: [
      {
        _id: req.user.user_id,
        name: req.user.name,
        email: req.user.email,
      },
      {
        _id: userId,
        name: toName, // Placeholder, as user details are not available
        email: toEmail, // Placeholder, as user details are not available
      }
    ],
  };

  try {
    chat = await Chat.create(chatData);
    const fullChat = await Chat.findById(chat._id).populate("latestMessage");
    res.status(200).json(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @description     Fetch all chats for a user
// @route           GET /api/chat/
// @access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  console.log("users---->", req.user)
  try {
    const chats = await Chat.find({ 'users._id': req.user.user_id })
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @description     Create New Group Chat
// @route           POST /api/chat/group
// @access          Protected
const createGroupChat = asyncHandler(async (req, res) => {
  console.log("req----->", req.user)
  if (!req.body.users || !req.body.chatName) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  // Ensure `users` is parsed correctly
  let users = req.body.users;
  if (users.length < 2) {
    return res.status(400).send("More than 2 users are required to form a group chat");
  }

  // Add the requesting user to the group
  if (req.user && req.user.user_id) {
    users.push({
      _id: req.user.user_id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    return res.status(400).send("Requesting user's details are missing");
  }

  // Create the groupUsers array
  const groupUsers = users.map(user => ({
    _id: user._id,
    name: user.name,
    email: user.email,
  }));

  try {
    const groupChat = await Chat.create({
      chatName: req.body.chatName,
      users: groupUsers,
      isGroupChat: true,
      groupAdmin: {
        _id: req.user.user_id,
        name: req.user.name,
        email: req.user.email,
      },
    });

    res.status(200).json(groupChat);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});


// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    ).populate("groupAdmin");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    }

    res.json(updatedChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: { _id: userId } } },
      { new: true }
    ).populate("groupAdmin");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    }

    res.json(updatedChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Add user to Group
// @route   PUT /api/chat/groupadd
// @access  Protected
const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: {
        _id: userId,
        name: "Unknown", // Placeholder, as user details are not available
        email: "Unknown", // Placeholder, as user details are not available
      } } },
      { new: true }
    ).populate("groupAdmin");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    }

    res.json(updatedChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
