// src/components/Chat.tsx
import React, { useEffect, useState } from "react";
import { socket, connectSocket } from "./socket";
import { getMessage, postMessage } from "../service/chat";
import { useChatState } from "../context/chatContext";
import ScrollToBottom from 'react-scroll-to-bottom';

interface ChatProps {
  chats: Chat[];
}

interface Message {
  _id: string;
  content: string;
  sender: {
    _id: string;
    name: string;
  };
  chat: {
    _id: string;
    chatName: string;
  };
}

interface Chat {
  _id: string;
  chatName: string;
  users: Array<{
    _id: string;
    name: string;
  }>;
}

const Chat: React.FC<ChatProps> = ({ chats }) => {
  const chatContext = useChatState()
  const [messages, setMessages] = useState<Message[]>([]);

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const userId = chatContext?.user?.id

  useEffect(() => {
    connectSocket(userId);

    socket.on("message received", (newMessage: Message) => {
      if (selectedChat && newMessage.chat._id === selectedChat._id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [userId, selectedChat]);

  const handleSendMessage = async () => {
    if (!newMessage || !selectedChat) return;

    try {
      const payload = {
        content: newMessage,
        chatId: selectedChat._id,
      }
      const response = await postMessage(payload);
      console.log("response", response)

      setMessages([...messages, response]);
      socket.emit("new message", response);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  const selectChat = async (chat: Chat) => {
    console.log("chat------->", chat)
    setSelectedChat(chat);
    socket.emit("join chat", chat._id);

    try {
      const response = await getMessage(chat._id);
      setMessages(response);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const showUser = () => {
    chatContext.setShowUsers(!chatContext.showUsers)
  }

  return (
    <div className="chat-inner-container">
      <div className="chat-list-container">
        <div className="chatlist-title-conatiner">
          <p>Chats List</p>
          <button className="new-btn" onClick={() => showUser()}>{!chatContext.showUsers ? 'New Chat' : 'close users'}</button>
        </div>
        {chats?.map((chat) => (
          <div className="chat-users">
            <p key={chat._id} onClick={() => selectChat(chat)}>
              {chat.chatName}
            </p>
          </div>
        ))}
      </div>

      <div className="chat-message-container">
        {selectedChat && (
          <>
            <h3 className="title">{selectedChat.chatName}</h3>
            <div className="messages-box">
              {/* <div className="message-inner-scroll"> */}
              <ScrollToBottom className="message-inner-scroll">
                {messages?.map((msg) => (
                  <div className={msg.sender._id !== userId ? "message-right-box" : "message-left-box"} key={msg._id}>
                    <p className="sender">{msg.sender.name}:</p>
                    <p className="message">{msg.content}</p>
                  </div>
                ))}
              </ScrollToBottom>
            </div>
            <div className="send-msg-container">
              <input
                type="text"
                className="input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="send-btn" onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
