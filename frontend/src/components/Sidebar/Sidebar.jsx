import React from 'react';
import styles from './Sidebar.module.css'; 
import boardimg from "../../assets/BoardImg.png";
import analyticsimg from "../../assets/AnalyticsImg.png";
import settingimg from "../../assets/settingImg.png";
import Logoutimg from "../../assets/LogoutImg.png";
import TaskLogo from "../../assets/TaskLogo.png";

const Sidebar = ({ navigate, url, setShowLogout }) => {
  const navItems = [
    { label: 'Board', path: '/dashboard', img: boardimg },
    { label: 'Analytics', path: '/analytics', img: analyticsimg },
    { label: 'Settings', path: '/settings', img: settingimg },
  ];

  return (
    <div className={styles.leftcontainer}>
      <div className={styles.logo}>
        <img src={TaskLogo} alt="TaskLogo" />
        <h1>Pro Manage</h1>
      </div>
      {navItems.map((item) => (
        <div 
          key={item.label}
          onClick={() => navigate(item.path)}
          className={url === item.path.split('/').pop() ? styles.selectedtype : ''}>
          <img src={item.img} alt={item.label} />
          <h2>{item.label}</h2>
        </div>
      ))}
      <div className={styles.logout} onClick={() => setShowLogout(true)}>
        <img src={Logoutimg} alt="Logout" />
        <h2>Log Out</h2>
      </div>
    </div>
  );
};

export default Sidebar;
