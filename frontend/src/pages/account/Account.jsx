import React, { useState } from 'react';
import './Account.css';
import GeneralTopBar from '../generalTopBar/GeneralTopBar'; 
import PagesBackground from '../components/pages-background/PagesBackground';'../pages/pages-background.css';


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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setConfirmationMessage(''); 
    setError('');  
  };

  const handleUpdateAccount = (e) => {
    e.preventDefault();
    setConfirmationMessage("Datele contului au fost actualizate cu succes!");
  };

  const handleDeleteAccount = () => {
    setConfirmationMessage("Contul a fost șters cu succes!");
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
            <h3>Actualizați datele contului</h3>
          </div>
          <div className="option" onClick={() => handleOptionChange('delete')}>
          <i className="fas fa-trash"></i>
            <h3>Ștergeti contul</h3>
          </div>
        </div>

        <div className={`form-container ${selectedOption ? 'show' : ''}`}>
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
              <button type="submit">Salvați modificările</button>
            </form>
          )}

          {selectedOption === 'delete' && (
            <div>
              <h3>Sigur doriți să vă ștergeți contul?</h3>
              <button onClick={handleDeleteAccount}>Confirmați ștergerea contului</button>
            </div>
          )}

          {confirmationMessage && <p>{confirmationMessage}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Account;