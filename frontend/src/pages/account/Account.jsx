// import React, { useState } from 'react';
// import './Account.css';
// import GeneralTopBar from '../generalTopBar/GeneralTopBar'; 
// import PagesBackground from '../components/pages-background/PagesBackground';'../pages/pages-background.css';


// const Account = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [confirmationMessage, setConfirmationMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//     setConfirmationMessage(''); 
//     setError('');  
//   };

//   const handleUpdateAccount = (e) => {
//     e.preventDefault();
//     setConfirmationMessage("Datele contului au fost actualizate cu succes!");
//   };

//   const handleDeleteAccount = () => {
//     setConfirmationMessage("Contul a fost șters cu succes!");
//   };

//   return (
//     <>
//       <GeneralTopBar /> 
//       <div className="pages-background"></div>
//       <div className="account-container">
//         <div className="options-table">
//           <h2>Alegeți o opțiune:</h2>
//           <div className="option" onClick={() => handleOptionChange('update')}>
//           <i className="fas fa-edit"></i>
//             <h3>Actualizați datele contului</h3>
//           </div>
//           <div className="option" onClick={() => handleOptionChange('delete')}>
//           <i className="fas fa-trash"></i>
//             <h3>Ștergeti contul</h3>
//           </div>
//         </div>

//         <div className={`form-container ${selectedOption ? 'show' : ''}`}>
//           {selectedOption === 'update' && (
//             <form onSubmit={handleUpdateAccount}>
//               <h3>Actualizați contul dumneavoastră:</h3>
//               <input
//                 type="text"
//                 placeholder="Prenume"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Nume"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Parola veche"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Parola nouă"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <input
//                 type="password"
//                 placeholder="Confirmare parola nouă"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <button type="submit">Salvați modificările</button>
//             </form>
//           )}

//           {selectedOption === 'delete' && (
//             <div>
//               <h3>Sigur doriți să vă ștergeți contul?</h3>
//               <button onClick={handleDeleteAccount}>Confirmați ștergerea contului</button>
//             </div>
//           )}

//           {confirmationMessage && <p>{confirmationMessage}</p>}
//           {error && <p className="error-message">{error}</p>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Account;
import React, { useState } from 'react';
import './Account.css';
import GeneralTopBar from '../generalTopBar/GeneralTopBar';
import PagesBackground from '../components/pages-background/PagesBackground';

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
  const [userId] = useState(1);  

  const email_settings = "vlaicmirela29@yahoo.com";
  const password_settings = "parolaMoneyTalks29";

  const token = btoa(`${email_settings}:${password_settings}`);

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

    try {
      const response = await fetch(`http://localhost:8080/users/${userId}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (response.ok) {
        setConfirmationMessage("Datele contului au fost actualizate cu succes!");
        showPopup('success');
      } else {
        setError(result.message || 'A apărut o eroare!');
        showPopup('error');
      }
    } catch (err) {
      setError('A apărut o eroare la actualizarea datelor!');
      showPopup('error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const passwordData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await fetch(`http://localhost:8080/users/resetPassword/${email}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        setConfirmationMessage("Parola a fost schimbată cu succes!");
        showPopup('success');
      } else {
        setError('A apărut o eroare la schimbarea parolei!');
        showPopup('error');
      }
    } catch (err) {
      setError('A apărut o eroare la schimbarea parolei!');
      showPopup('error');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        setConfirmationMessage("Contul a fost șters cu succes!");
        showPopup('success');
      } else {
        setError('A apărut o eroare la ștergerea contului!');
        showPopup('error');
      }
    } catch (err) {
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
      <div className="pages-background"></div>
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
              <h3>Sigur doriți să vă ștergeți contul?</h3>
              <button onClick={handleDeleteAccount}>Confirmați ștergerea contului</button>
            </div>
          )}
        </div>

        
        <div id="popup-message" className="popup-message">
          <p>{confirmationMessage || error}</p>
          <button className="close-btn" onClick={closePopup}>OK</button>
        </div>
      </div>
    </>
  );
};

export default Account;
