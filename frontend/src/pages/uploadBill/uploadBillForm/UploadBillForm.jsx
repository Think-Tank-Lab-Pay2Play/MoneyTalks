import React, { useState, useRef, useEffect } from 'react';
import './UploadBillForm.css';
import QRCodeComponent from "./qRCodeComponent/QRCodeComponent.jsx";
import axios from "axios";
import { storage } from '../../../../firebase/FireBaseConfig.jsx';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { listAll } from "firebase/storage";
import BillDetails from './billDetails/BillDetails.jsx';


const UploadBillForm = () => {
  const [fileName, setFileName] = useState('Niciun fișier selectat');
  const [resultText, setResultText] = useState('');
  const fileInputRef = useRef(null);
  const [billData, setBillData] = useState(null);
  const [isManualUpload, setIsManualUpload] = useState(false);

  const localIP = ""; // your ipv4 address here from ipconfig

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = localStorage.getItem("auth");
      if (!storedData) return;

      const { email, password } = JSON.parse(storedData);
      try {
        const userResponse = await axios.get(
          `http://localhost:8080/users/byEmail/${email}`,
          {
            headers: { "Content-Type": "application/json" },
            auth: { username: email, password },
          }
        );

        if (userResponse.data?.id) {
          setUserId(userResponse.data.id);
        }
      } catch (error) {
        console.error("Eroare la preluarea userului:", error);
      }
    };

    fetchUserData();
  }, []);

  const uploadUrl = `http://${localIP}:3001/upload`;
  const [numberOfPictures, setNumberOfPictures] = useState(0);
  const prevNumberOfPictures = useRef(numberOfPictures);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [qrUploadUrl, setQrUploadUrl] = useState(uploadUrl);

  const fetchNumberOfPictures = async (userId, setNumberOfPictures) => {
    if (!userId) return;

    const imageListRef = ref(storage, `upload/${userId}`);

    try {
      const res = await listAll(imageListRef);
      setNumberOfPictures(res.items.length);
    } catch (error) {
      console.error("Eroare la obținerea listei de imagini:", error);
    }
  };


  useEffect(() => {
    if (isManualUpload) return;
    if (
      prevNumberOfPictures.current !== numberOfPictures &&
      (prevNumberOfPictures.current !== 0 || numberOfPictures === 1)
    ) {
      //console.log("User-ul a uploadat o imagine!");
      //console.log(numberOfPictures);
      //console.log(prevNumberOfPictures.current);
      prevNumberOfPictures.current = numberOfPictures;

      const fetchLatestImage = async () => {
        try {
          const imageListRef = ref(storage, `upload/${userId}`);
          const res = await listAll(imageListRef);

          if (res.items.length === 0) {
            console.warn("Nu există imagini încărcate.");
            return;
          }

          const imageItems = res.items
            .map(item => {
              const match = item.name.match(/^(\d+)\.png$/);
              return match ? { ref: item, number: parseInt(match[1], 10) } : null;
            })
            .filter(item => item !== null) 
            .sort((a, b) => b.number - a.number);

          if (imageItems.length === 0) {
            console.warn("Nu s-au găsit imagini valide.");
            return;
          }

          const latestImageRef = imageItems[0].ref; 
          const latestImageUrl = await getDownloadURL(latestImageRef);
          setQrUploadUrl(latestImageUrl);

          console.log("Ultima imagine încărcată:", latestImageUrl);

          const storedData = localStorage.getItem("auth");
          if (!storedData) return;

          const { email, password } = JSON.parse(storedData);

          const response = await axios.post(
            `http://localhost:8080/api/extract-products/url/${userId}`,
            { url: latestImageUrl },
            {
              headers: {
                Authorization: "Basic dGVzdEBleGFtcGxlLmNvbTpQYXNzd29yZDEyMw==",
                "Content-Type": "application/json",
              },
              auth: { username: email, password },
            }
          );

          setBillData(response.data);
          setFileName(`Imagine ${imageItems[0].number}`);
        } catch (error) {
          console.error("Eroare la obținerea imaginii:", error);
        }
      };


      fetchLatestImage();
    }
  }, [numberOfPictures]);


  useEffect(() => {

    if (numberOfPictures > prevNumberOfPictures.current) {
      prevNumberOfPictures.current = numberOfPictures;
    }
  }, [numberOfPictures]);


  useEffect(() => {
    if (!userId) return;
    const intervalId = setInterval(() => {
      fetchNumberOfPictures(userId, setNumberOfPictures);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [userId]);


  //console.log(numberOfPictures);
  /*

  const handleGenerateUserIdFile = async () => {

    try {
      const response = await fetch('http://localhost:3001/generateUserIdFile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          numberOfPictures: numberOfPictures + 1
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fișierul a fost generat cu succes:", data);
      } else {
        console.error("Eroare la generarea fișierului");
      }
    } catch (error) {
      console.error("Eroare la comunicarea cu serverul:", error);
    }
  };
  */

  const handleFileChange = async (event) => {
    setIsManualUpload(true);
    const file = event.target.files[0];
    if (!file) return;

    if (!userId) {
      console.error("User ID invalid");
      return;
    }

    try {
      const imageListRef = ref(storage, `upload/${userId}`);
      const res = await listAll(imageListRef);

      const newFileName = `${res.items.length + 1}${file.name.substring(file.name.lastIndexOf('.'))}`;
      const fileRef = ref(storage, `upload/${userId}/${newFileName}`);

      await uploadBytes(fileRef, file);
      console.log("Imagine încărcată cu succes în Firebase 2");

      const imageUrl = await getDownloadURL(fileRef);
      console.log("URL imagine:", imageUrl);

      setFileName(newFileName);
      setQrUploadUrl(imageUrl);

      const storedData = localStorage.getItem("auth");
      if (!storedData) return;

      const { email, password } = JSON.parse(storedData);

      //console.log(qrUploadUrl);

      const response = await axios.post(`http://localhost:8080/api/extract-products/url/${userId}`, {
        url: imageUrl
      }, {
        headers: { 'Authorization': 'Basic dGVzdEBleGFtcGxlLmNvbTpQYXNzd29yZDEyMw==', 'Content-Type': 'application/json' },
        auth: { username: email, password }
      });

      setBillData(response.data);

      //console.log(response.data);

      //setResultText(`Imagine încărcată cu succes!\nText: ${response.data}`);

    } catch (error) {
      console.error("Eroare la încărcare:", error);
      setFileName("Eroare la încărcare");
      event.target.value = "";
    }
  };




  const handleConfirm = async (event) => { // aici fac sa se dea post la spending-ul returnat in handleFileChange
    // FA O NOTIFICARE TOAST CAND SE APASA PE BUTONUL DE CONFIRM/RESPINGERE
    try {
      await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, confirmed: true }),
      });
      setFileName("Niciun fișier selectat");
      setBillData(null);
      setIsManualUpload(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Eroare:", error);
    }
  };


  return (
    <div className="upload-bill-form-wrapper">
      <div className="upload-bill-form-container">
        <div className="upload-bill-form-header">
          {billData ? (
            <BillDetails billData={billData} />
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Încarcă poza unui bon sau a unei facturi</p>
            </>
          )}
        </div>

        {billData ? (
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmă datele
          </button>
        ) : (
          <>
            <label htmlFor="file" className="upload-bill-form-footer">
              <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.331 6H8.5v20h15V14.154h-8.169z" />
                <path d="M18.153 6h-.009v5.342H23.5v-.002z" />
              </svg>
              <p>{fileName}</p>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z"
                  stroke="#000000"
                  strokeWidth={2}
                />
                <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" />
                <path
                  d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z"
                  stroke="#000000"
                  strokeWidth={2}
                />
              </svg>
            </label>

            <div className="qr-section">
              <p>sau scanează codul QR pentru a încărca direct de pe telefon:</p>
              <QRCodeComponent value={uploadUrl} />
            </div>
          </>
        )}

        <input
          id="file"
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  );

};

export default UploadBillForm;