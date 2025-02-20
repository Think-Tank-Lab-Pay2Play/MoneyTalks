import React from "react";
import QRCode from "react-qr-code";
import app_logo from "../../../../assets/piggy_from_logo.png"; 

const QRCodeComponent = ({ value }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <QRCode value={value} size={200} bgColor="white" fgColor="black" />
      <img
        src={app_logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40px",
          height: "40px",
          borderRadius: "25px",
          backgroundColor: "white",
          padding: "1px",
        }}
      />
    </div>
  );
};

export default QRCodeComponent;
