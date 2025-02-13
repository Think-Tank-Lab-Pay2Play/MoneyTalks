import React from "react";
import "./StatisticsOptions.css";
import Lottie from "lottie-react";
import calendarAnimation from "../animatedIcons/Calendar_custom_icon.json";
import barGraphAnimation from "../animatedIcons/Bar graph_custom_icon.json"
import walletAnimation from "../animatedIcons/Wallet_custom_icon.json";
import tagIconAnimation from "../animatedIcons/Tag_custom_icon.json";
import creditCardAnimation from "../animatedIcons/Credit card_custom_icon.json";
import shoppingCartAnimation from "../animatedIcons/Shopping cart_custom_icon.json";

const StatisticsOptions = () => {
  return (
    <div className="statistics-options">
      <legend className="statistics-options__title">Alege una dintre statistici:</legend>
      

      <label htmlFor="cheltuieliPeCategorii" className="statistics-options__item">
        <div className="statistics-options__icon statistics-options__icon--cheltuieliPeCategorii">
            <Lottie animationData={calendarAnimation} loop={true} />
        </div>
        Afisarea cheltuielilor pe categorii<br/> in una din lunile unui an
        <input type="radio" name="status" defaultChecked id="cheltuieliPeCategorii" className="statistics-options__radio" />
      </label>


      <label htmlFor="evolutieCheltuieli" className="statistics-options__item">
        <div className="statistics-options__icon statistics-options__icon--evolutieCheltuieli">
            <Lottie animationData={barGraphAnimation} loop={true} />
        </div>
        Evoluția cheltuielilor pe categorii
        <input type="radio" name="status" id="evolutieCheltuieli" className="statistics-options__radio" />
      </label>


      <label htmlFor="medieCheltuieli" className="statistics-options__item">
        <div className="statistics-options__icon statistics-options__icon--medieCheltuieli">
            <Lottie animationData={walletAnimation} loop={true} />
        </div>
        Media cheltuielilor pe o perioada<br/> de timp
        <input type="radio" name="status" id="medieCheltuieli" className="statistics-options__radio" />
      </label>


      <label htmlFor="topCheltuieli" className="statistics-options__item">
        <div className="statistics-options__icon statistics-options__icon--topCheltuieli">
            <Lottie animationData={creditCardAnimation} loop={true} />
        </div>
        Top cheltuieli pe o perioada de<br/> timp
        <input type="radio" name="status" id="topCheltuieli" className="statistics-options__radio" />
      </label>


      <label htmlFor="topProduseCumparate" className="statistics-options__item">
        <div className="statistics-options__icon statistics-options__icon--topProduseCumparate">
            <Lottie animationData={tagIconAnimation} loop={true} />
        </div>
        Top produse achizitionate pe o<br/> perioada de timp
        <input type="radio" name="status" id="topProduseCumparate" className="statistics-options__radio" />
      </label>


      <label htmlFor="topMagazineFrecventate" className="statistics-options__item">
        <div className="statistics-options__icon statistics-options__icon--topMagazineFrecventate">
            <Lottie animationData={shoppingCartAnimation} loop={true} />
        </div>
        Top magazine frecventate de tine
        <input type="radio" name="status" id="topMagazineFrecventate" className="statistics-options__radio" />
      </label>
    
    </div>
  );
};

export default StatisticsOptions;
