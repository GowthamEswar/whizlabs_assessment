import React, { useEffect, useState } from 'react';
import { getUsers } from "../service/user";
import Chat from '../components/Chat';
import { createChat, getChats } from '../service/chat';
import { useChatState } from '../context/chatContext';

interface ChatInterFace {
    _id: string;
    chatName: string;
    users: Array<{
        _id: string;
        name: string;
    }>;
}

const ChatMessages = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState<ChatInterFace[]>([]);
    const chatContext = useChatState();

    const userContext = useChatState()

    const handleInputChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            const filteredItems = response.data.filter((item: any) =>
                item.email !== userContext?.user?.email
            );
            setUsers(filteredItems);
        } catch (error) {
            console.error("Error fetching chats", error);
        }
    };


    useEffect(() => {
        if (searchQuery.length === 0) fetchUsers()
        else {
            // Filtered list based on search query
            const filteredItems = users.filter((item) =>
                item.email.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setUsers(filteredItems)
        }

    }, [searchQuery])

    const fetchChats = async () => {
        try {
            const response = await getChats();
            setChats(response);
        } catch (error) {
            console.error("Error fetching chats", error);
        }
    };


    useEffect(() => {
        fetchChats();
    }, [])

    useEffect(() => {
      if(chatContext.showUsers)  fetchUsers();
    }, [chatContext.showUsers])

    const newChat = async (data: any) => {
        console.log(data)
        // const user: any = localStorage.getItem("user")
        // const parsed = JSON.parse(user)
        const payload = {
            "userId": data.user_id,
            "toName": data.name,
            "toEmail": data.email
        }
        console.log(payload)
        const response = await createChat(payload)
        console.log(response)
        if (response) fetchChats()
    }

    return (
        <>
            <div className='chat-container'>
                {chatContext.showUsers ? <div className='users-container'>
                    <p className='title'>User list</p>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    <div className='users-inner-container'>
                        {users?.map((data) =>
                            <div className='user-details' onClick={() => newChat(data)}>
                                <p className='name'> {data.name}</p>
                                <p className='email'> {data.email}</p>
                            </div>
                        )}
                    </div>
                </div> : ''
                }
                <Chat chats={chats} />
            </div>

        </>
    );
}

export default ChatMessages;
