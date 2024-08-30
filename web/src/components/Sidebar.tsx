/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import dashboardIcon from "../assets/DashboardIcon.svg";
import ChatIcon from "../assets/ChatIcon.svg";
import ChatIconWithoutNotification from "../assets/chatIconWithoutNotification.svg";
import { useEffect, useState } from "react";


function SideBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuItems, setMenuItems] = useState([
    {
      path: 'product',
      icon: dashboardIcon,
      altIcon: dashboardIcon,
      title: 'Product',
    },
    {
      path: 'cart',
      icon: dashboardIcon,
      altIcon: dashboardIcon,
      title: 'Cart',
    },
    {
      path: "chats",
      icon: ChatIcon,
      altIcon: ChatIconWithoutNotification,
      title: `Chats`,
    },
  ]);



  return (
    <div className="side_bar_container">
      {/* <img className="side_bar_logo" src={ChatIcon} alt="" /> */}

      <div className="sidebar_menus">
        {menuItems.map((menuItem, i) => (
          <div
            key={i}
            className={`sidebar_menu ${pathname.includes(menuItem.path) ? `active` : `inActive`
              }`}
            onClick={() => {
              navigate(menuItem.path);
            }}
          >
            <p>{menuItem.title}</p>
          </div>
        ))}
        <div
          className={`sidebar_menu ${pathname.includes('logout') ? `active` : `inActive`
            }`}
          onClick={() => {
            localStorage.clear()
            navigate('/');
          }}
        >
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;