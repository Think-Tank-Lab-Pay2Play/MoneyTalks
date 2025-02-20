import React from "react";
import QRCodeComponent from "./QRCodeComponent.jsx";

const UploadBillThroughQRCode = () => {
  const uploadUrl = `${window.location.origin}/upload-form`;

  return (
    <div>
      <QRCodeComponent value={uploadUrl} />
    </div>
  );
};

export default UploadBillThroughQRCode;
