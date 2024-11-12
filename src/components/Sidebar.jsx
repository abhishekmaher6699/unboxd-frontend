import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaStar, FaUserFriends } from 'react-icons/fa';

function Sidebar() {
  const navItems = [
    { icon: <FaHome size={24} />, path: '/', label: 'Home', activeColor: 'bg-black' },
    { icon: <FaChartBar size={24} />, path: '/stats', label: 'Stats', activeColor: 'bg-blue-600' },
    { icon: <FaStar size={24} />, path: '/reviews', label: 'Reviews', activeColor: 'bg-red-600' },
    { icon: <FaUserFriends size={24} />, path: '/friends', label: 'Friends', activeColor: 'bg-green-600' },
  ];

  return (
    <div className="z-20 fixed bg-gray-600 bg-opacity-90 bottom-5 sm:bottom-auto left-1/4 sm:top-1/4 sm:left-2 h-auto sm:w-16 flex sm:flex-col items-center px-4 sm:px-0 py-2 sm:py-4 gap-2 rounded-full shadow-lg">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? `text-white ${item.activeColor} w-10 h-10 flex justify-center items-center rounded-full`
              
              : 'text-gray-400 hover:text-white hover:bg-gray-700 w-10 h-10 flex justify-center items-center rounded-full'
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
