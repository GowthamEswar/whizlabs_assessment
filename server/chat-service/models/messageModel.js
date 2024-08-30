// models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    content: { type: String, trim: true, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
