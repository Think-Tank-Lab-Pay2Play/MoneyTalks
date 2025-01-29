import React from 'react';
import './HomePageUserOptions.css';

const HomePageUserOptions = () => {
  return (
    <div className="home-page-user-options-wrapper">
      <div className="home-page-user-options-cards">
        <div className="home-page-user-options-card red">
          <p className="tip">Tutorial</p>
          <p className="second-text">Afla cum utilizezi platforma!</p>
        </div>
        <div className="home-page-user-options-card blue">
          <p className="tip">Generare rapoarte</p>
          <p className="second-text">Genereaza rapoarte personalizate pentru tine!</p>
        </div>
        <div className="home-page-user-options-card green">
          <p className="tip">Incarca un bon</p>
          <p className="second-text">Incarca bonurile tale si tine evidenta echeltuielilor!</p>
        </div>
        <div className="home-page-user-options-card yellow">
          <p className="tip">Tabel cheltuieli</p>
          <p className="second-text">Vezi cheltuielile tale pe o perioada de timp!</p>
        </div>
        <div className="home-page-user-options-card purple">
          <p className="tip">Statistici cheltuieli</p>
          <p className="second-text">Vezi mai multe statistici despre cheltuielile tale!</p>
        </div>
      </div>
    </div>
  );
}

export default HomePageUserOptions;
