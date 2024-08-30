import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { boolean } from "yup";

// Define types for the context state
interface ChatContextType {
  selectedChat: any;
  setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  notification: any[];
  setNotification: React.Dispatch<React.SetStateAction<any[]>>;
  chats: any;
  setChats: React.Dispatch<React.SetStateAction<any>>;
  showUsers: boolean;
  setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create context with initial undefined value
const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [notification, setNotification] = useState<any[]>([]);
  const [chats, setChats] = useState<any>(null);
  const [showUsers, setShowUsers] = useState<boolean>(false);


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    setUser(userInfo);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        showUsers, 
        setShowUsers
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChatState = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatState must be used within a ChatProvider");
  }
  return context;
};

export default ChatProvider;
