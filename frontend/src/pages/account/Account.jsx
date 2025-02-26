import React, { useState, useEffect } from 'react';
import './Account.css';
import GeneralTopBar from '../generalTopBar/GeneralTopBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../components/authContext/AuthContext.jsx"
import PagesBackground from '../components/pages-background/PagesBackground.jsx';
import SliderAnimation from './sliderAnimation/SliderAnimation.jsx';
import SliderAnimation2 from './sliderAnimation2/SliderAnimation2.jsx';
import { toast } from 'react-toastify';

const Account = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); 
  const { logout } = useAuth();

  useEffect(() => {
    const storedData = localStorage.getItem("auth");
    if (!storedData) return;

    const { email, password } = JSON.parse(storedData);

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/byEmail/${email}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
          },
        });

        setUserData(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      } catch (err) {
        console.error('Eroare la obținerea datelor utilizatorului:', err);
        setError('Nu am putut obține datele utilizatorului.');
      }
    };

    fetchUserData();
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setConfirmationMessage('');
    setError('');
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    const updatedData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    const userId = userData.id;
    const storedData = localStorage.getItem("auth");
    const { email: storedEmail, password } = JSON.parse(storedData);

    try {
      const response = await axios.put(`http://localhost:8080/users/${userId}/profile`, updatedData, {
        headers: {
          'Authorization': `Basic ${btoa(`${storedEmail}:${password}`)}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Datele contului au fost actualizate!', { autoClose: 3000 });
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', localStorage.getItem('userPassword')); 
        setUserData(response.data);
      } else {
        toast.error('A apărut o eroare!', { autoClose: 3000 });
      }
    } catch (err) {
      console.error('Eroare la actualizarea datelor:', err);
      toast.error('A apărut o eroare la actualizarea datelor!', { autoClose: 3000 });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Parolele nu coincid!', { autoClose: 5000 });
      return;
    }

    const passwordData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const storedData = localStorage.getItem("auth");
    const { email: storedEmail, password } = JSON.parse(storedData);

    try {
      const response = await axios.put(`http://localhost:8080/users/resetPassword/${storedEmail}`, passwordData, {
        headers: {
          'Authorization': `Basic ${btoa(`${storedEmail}:${password}`)}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Parola a fost schimbată cu succes!', { autoClose: 3000 });
      } else {
        toast.error('A apărut o eroare la schimbarea parolei!', { autoClose: 3000 });
      }
    } catch (err) {
      console.error('Eroare la schimbarea parolei:', err);
      setError('A apărut o eroare la schimbarea parolei!');
      showPopup('error');
    }
  };

  const handleDeleteAccount = async () => {
    const storedData = localStorage.getItem("auth");
    const { email: storedEmail, password } = JSON.parse(storedData);
  
    if (!userData) {
      setError('Utilizatorul nu este încă încărcat.');
      showPopup('error');
      return; 
    }
  
    try {
      const response = await axios.delete(`http://localhost:8080/users/${userData.id}`, {
        headers: {
          'Authorization': `Basic ${btoa(`${storedEmail}:${password}`)}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 204 || response.status === 200) {
        toast.success('Contul a fost șters cu succes!', { autoClose: 3000 });
        localStorage.removeItem("auth");
      
        setTimeout(() => {
          logout();
          navigate('/');
        }, 3000);  
      } else {
        setError('A apărut o eroare la ștergerea contului!');
        showPopup('error');
      }
    } catch (err) {
      console.error('Eroare la ștergerea contului:', err);
      setError('A apărut o eroare la ștergerea contului!');
      showPopup('error');
    }
  };

  const showPopup = (type) => {
    const popup = document.getElementById('popup-message');
    popup.classList.add(type);
    popup.style.display = 'block';
  };

  const closePopup = () => {
    const popup = document.getElementById('popup-message');
    popup.style.display = 'none';
  };

  return (
    <>
      <GeneralTopBar />
      <PagesBackground/>
      <SliderAnimation/>
      <SliderAnimation2/>
      <div className="account-settings-page">
        <div className="account-container">
          <div className="options-table">
            <h2>Alegeți o opțiune:</h2>
            <div className="option" onClick={() => handleOptionChange('update')}>
              <i className="fas fa-edit"></i>
              <h3>Actualizați detaliile contului</h3>
            </div>
            <div className="option" onClick={() => handleOptionChange('password')}>
              <i className="fas fa-key"></i>
              <h3>Schimbați parola</h3>
            </div>
            <div className="option" onClick={() => handleOptionChange('delete')}>
              <i className="fas fa-trash"></i>
              <h3>Ștergeți contul</h3>
            </div>
          </div>
  
          <div className={`form-container ${selectedOption === 'update' ? 'show' : ''}`}>
            {selectedOption === 'update' && (
              <form onSubmit={handleUpdateAccount}>
                <h3>Actualizați contul dumneavoastră:</h3>
                <input
                  type="text"
                  placeholder="Prenume"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nume"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Salvați modificările</button>
              </form>
            )}
          </div>
  
          <div className={`form-container ${selectedOption === 'password' ? 'show' : ''}`}>
            {selectedOption === 'password' && (
              <form onSubmit={handleChangePassword}>
                <h3>Schimbați parola:</h3>
                <input
                  type="password"
                  placeholder="Parola veche"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Parola nouă"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirmare parola nouă"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Schimbați parola</button>
              </form>
            )}
          </div>
  
          <div className={`form-container ${selectedOption === 'delete' ? 'show' : ''}`}>
            {selectedOption === 'delete' && (
              <div className="delete-account">
                <h3 className='account-settings-delete-acc-title'>Sigur doriți să vă ștergeți contul?</h3>
                <h4 className='account-settings-delete-acc-warning'>Această acțiune este ireversibilă și duce la ștergerea tuturor datelor tale din sistemele Money Talks.</h4>
                <button onClick={handleDeleteAccount}>Confirmați ștergerea contului</button>
              </div>
            )}
          </div>
  
          <div id="popup-message" className="popup-message">
            <p>{confirmationMessage || error}</p>
            <button className="close-btn" onClick={closePopup}>OK</button>
          </div>
        </div>
      </div>
    </>
  )};
  
export default Account;
