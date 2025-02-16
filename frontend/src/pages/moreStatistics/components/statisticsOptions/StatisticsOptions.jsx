import React from "react";
import "./StatisticsOptions.css";
import Lottie from "lottie-react";
import calendarAnimation from "../animatedIcons/Calendar_custom_icon.json";
import barGraphAnimation from "../animatedIcons/Bar graph_custom_icon.json"
import walletAnimation from "../animatedIcons/Wallet_custom_icon.json";
import tagIconAnimation from "../animatedIcons/Tag_custom_icon.json";
import creditCardAnimation from "../animatedIcons/Credit card_custom_icon.json";
import shoppingCartAnimation from "../animatedIcons/Shopping cart_custom_icon.json";
import { useEffect, useState } from "react";
import axios from "axios";
import TopShopsAttended from "../statisticsLayers/topShopsAttended/TopShopsAttended";
import TopItemsBoughtInAPeriod from "../statisticsLayers/topItemsBoughtInAPeriod/TopItemsBoughtInAPeriod";
import TopSpendingsInAPeriod from "../statisticsLayers/topSpendingsInAPeriod/TopSpendingsInAPeriod";
import SpendingsAverageInAPeriod from "../statisticsLayers/spendingsAverageInAPeriod/SpendingsAverageInAPeriod";
import SpendingsEvolutionPerCategories from "../statisticsLayers/spendingsEvolutionPerCategories/SpendingsEvolutionPerCategories";
import SpendingsPerCategories from "../statisticsLayers/spendingsPerCategories/SpendingsPerCategories";

const StatisticsOptions = () => {

  const [selectedStatistic, setSelectedStatistic] = useState("cheltuieliPeCategorii");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userSpendingsData, setUserSpendingsData] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      const storedData = localStorage.getItem("auth");
      if (!storedData) return;

      const { email, password } = JSON.parse(storedData);
      try {
        const userEmail = email;

        const userResponse = await axios.get(`http://localhost:8080/users/byEmail/${userEmail}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          auth: {
            username: email,
            password: password,
          }
        });

        const userData = {
          id: userResponse.data.id,
          firstName: userResponse.data.firstName,
          lastName: userResponse.data.lastName,
          email: userResponse.data.email,
          password: password,
          allSpendings: userResponse.data.spendings
        };

        setUserSpendingsData(userResponse.data.spendings);

      } catch (error) {
        console.error("Eroare la preluarea userului:", error);
      }
    };

    fetchUserData();
  }, []);

  const renderStatisticComponent = () => {
    switch (selectedStatistic) {
      case "cheltuieliPeCategorii":
        return <SpendingsPerCategories userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "evolutieCheltuieli":
        return <SpendingsEvolutionPerCategories userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "medieCheltuieli":
        return <SpendingsAverageInAPeriod userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "topCheltuieli":
        return <TopSpendingsInAPeriod userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "topProduseCumparate":
        return <TopItemsBoughtInAPeriod userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      case "topMagazineFrecventate":
        return <TopShopsAttended userSpendings={userSpendingsData} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />;
      default:
        return null;
    }
  };



  return (
    <div>
      <div className="statistics-options">
        <legend className="statistics-options__title">Alege una dintre statistici:</legend>

        <label htmlFor="cheltuieliPeCategorii" className="statistics-options__item">
          <div className="statistics-options__icon statistics-options__icon--cheltuieliPeCategorii">
            <Lottie animationData={calendarAnimation} loop={true} />
          </div>
          Afisarea cheltuielilor pe categorii
          <input type="radio" name="status" defaultChecked id="cheltuieliPeCategorii" className="statistics-options__radio" onChange={() => setSelectedStatistic("cheltuieliPeCategorii")} />
        </label>

        <label htmlFor="evolutieCheltuieli" className="statistics-options__item">
          <div className="statistics-options__icon statistics-options__icon--evolutieCheltuieli">
            <Lottie animationData={barGraphAnimation} loop={true} />
          </div>
          Evoluția cheltuielilor pe categorii
          <input type="radio" name="status" id="evolutieCheltuieli" className="statistics-options__radio" onChange={() => setSelectedStatistic("evolutieCheltuieli")} />
        </label>

        <label htmlFor="medieCheltuieli" className="statistics-options__item">
          <div className="statistics-options__icon statistics-options__icon--medieCheltuieli">
            <Lottie animationData={walletAnimation} loop={true} />
          </div>
          Media cheltuielilor
          <input type="radio" name="status" id="medieCheltuieli" className="statistics-options__radio" onChange={() => setSelectedStatistic("medieCheltuieli")} />
        </label>

        <label htmlFor="topCheltuieli" className="statistics-options__item">
          <div className="statistics-options__icon statistics-options__icon--topCheltuieli">
            <Lottie animationData={creditCardAnimation} loop={true} />
          </div>
          Top 10 cheltuieli
          <input type="radio" name="status" id="topCheltuieli" className="statistics-options__radio" onChange={() => setSelectedStatistic("topCheltuieli")} />
        </label>

        <label htmlFor="topProduseCumparate" className="statistics-options__item">
          <div className="statistics-options__icon statistics-options__icon--topProduseCumparate">
            <Lottie animationData={tagIconAnimation} loop={true} />
          </div>
          Top produse achizitionate
          <input type="radio" name="status" id="topProduseCumparate" className="statistics-options__radio" onChange={() => setSelectedStatistic("topProduseCumparate")} />
        </label>

        <label htmlFor="topMagazineFrecventate" className="statistics-options__item">
          <div className="statistics-options__icon statistics-options__icon--topMagazineFrecventate">
            <Lottie animationData={shoppingCartAnimation} loop={true} />
          </div>
          Top magazine frecventate de tine
          <input type="radio" name="status" id="topMagazineFrecventate" className="statistics-options__radio" onChange={() => setSelectedStatistic("topMagazineFrecventate")} />
        </label>
      </div>

      <div className="statistics-content">{renderStatisticComponent()}</div>
    </div>
  );
};

export default StatisticsOptions;
