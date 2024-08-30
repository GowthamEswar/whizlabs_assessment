// models/Chat.js

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true, required: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: {
      _id: { type: String },
      name: { type: String },
      email: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
