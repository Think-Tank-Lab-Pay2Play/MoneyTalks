import React from 'react';
import './ShowHideUploadBill.css';

const ShowHideUploadBill = ({ isVisible, toggleVisibility }) => {
  return (
    <div className="show-hide-upload-bill-container">
      <div className="show-hide-upload-bill-button-wrapper">
        <button className="show-hide-upload-bill-button" onClick={toggleVisibility}>
          <div className="show-hide-upload-bill-button-inner">
            <div className="show-hide-upload-bill-button-content">
              <span className="show-hide-upload-bill-button-text">
                {isVisible ? "Ascunde" : "Arată"}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ShowHideUploadBill;
