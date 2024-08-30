import React, { useEffect, useState } from 'react';
import SideBar from '../components/Sidebar';
import { useNavigate, useOutlet } from 'react-router-dom';
import ChatProvider from '../context/chatContext';

const MainLayout = () => {

    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) navigate('/');
    }, [])

    const outlet = useOutlet();
    return (
        <div className={show ? "main_overflow" : "main_layout_container"}>
            <ChatProvider>
                <SideBar />
                <div className="route_container">
                    <div className='topbar'>
                        {outlet}
                    </div>
                </div>
            </ChatProvider>
        </div>
    );
}

export default MainLayout;
