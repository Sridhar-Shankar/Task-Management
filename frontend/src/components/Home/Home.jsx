import React, { useState } from "react";
import styles from "./Home.module.css";
import Analytics from "../Analytics/Analytics";
import Dashboard from "../Dashboard/Dashboard";
import Settings from "../Settings/Settings";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import Logout from "../Logout/Logout";

const Home = () => {
  const location = useLocation().pathname.split("/");
  const navigate = useNavigate();
  const url = location[location.length - 1];
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <div className={styles.maincontainer}>
        <Sidebar navigate={navigate} url={url} setShowLogout={setShowLogout} />

        <div className={styles.rightcontainer}>
          {url === "board" && <Dashboard />}
          {url === "analytics" && <Analytics />}
          {url === "settings" && <Settings />}
        </div>
      </div>
      {showLogout && <Logout delete={showLogout} setdelete={setShowLogout} />}
    </>
  );
};

export default Home;
