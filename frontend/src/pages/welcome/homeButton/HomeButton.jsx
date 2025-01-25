import React from 'react';
import { useNavigate } from "react-router-dom";
import './HomeButton.css';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="styledWrapper">
      <button onClick={handleHomeClick}>
        <span>Acasa</span>
      </button>
    </div>
  );
};

export default HomeButton;
