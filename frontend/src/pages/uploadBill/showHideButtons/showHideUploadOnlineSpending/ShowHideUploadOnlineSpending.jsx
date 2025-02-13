import React from 'react';
import './ShowHideUploadOnlineSpending.css';

const ShowHideUploadOnlineSpending = ({ isVisible, toggleVisibility }) => {
  return (
    <div className="show-hide-upload-online-spending-container">
      <div className="show-hide-upload-online-spending-button-wrapper">
        <button className="show-hide-upload-online-spending-button" onClick={toggleVisibility}>
          <div className="show-hide-upload-online-spending-button-inner">
            <div className="show-hide-upload-online-spending-button-content">
              <span className="show-hide-upload-online-spending-button-text">
                {isVisible ? "Ascunde" : "Arată"}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ShowHideUploadOnlineSpending;
