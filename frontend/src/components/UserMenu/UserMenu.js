import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./UserMenu.css";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleHome = () => {
    navigate("/FieldDashboard");
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Remove only the authentication token
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/");
    setIsOpen(false);
  };

  return (
    <div className="user-menu-container">
      <FaUser onClick={toggleMenu} className="user-icon" />
      {isOpen && (
        <div className="user-menu-dropdown">
          <button onClick={handleHome}>Home</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
