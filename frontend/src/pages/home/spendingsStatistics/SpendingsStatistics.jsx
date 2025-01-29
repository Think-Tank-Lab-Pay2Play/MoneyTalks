import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./SpendingsStatistics.css";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const SpendingsStatistic = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Cheltuieli lunare",
        data: [],
        borderColor: "#007bff",
        backgroundColor: "#007bff",
        pointBackgroundColor: "#dc3545",
        pointRadius: 5,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (data && data.length > 0) {
      // Dacă avem date transmise ca parametru, le folosim direct
      const labels = data.map((item) => item.luna);
      const values = data.map((item) => item.suma);
      
      setChartData({
        labels,
        datasets: [
          {
            label: "Cheltuieli lunare",
            data: values,
            borderColor: "#007bff",
            backgroundColor: "#007bff",
            pointBackgroundColor: "#dc3545",
            pointRadius: 5,
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      });
    } else {
      // Dacă NU avem date transmise, facem fetch din backend
      const fetchSpendings = async () => {
        try {
          const response = await axios.get("URL_BACKEND/spendings");
          const fetchedData = response.data;

          const labels = fetchedData.map((item) => item.luna);
          const values = fetchedData.map((item) => item.suma);

          setChartData({
            labels,
            datasets: [
              {
                label: "Cheltuieli lunare",
                data: values,
                borderColor: "#007bff",
                backgroundColor: "#007bff",
                pointBackgroundColor: "#dc3545",
                pointRadius: 5,
                borderWidth: 2,
                tension: 0.4,
              },
            ],
          });
        } catch (error) {
          console.error("Eroare la preluarea datelor:", error);
        }
      };

      fetchSpendings();
    }
  }, [data]); // Se reactivează doar dacă `data` se schimbă

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Line 
          data={chartData} 
          options={{
            maintainAspectRatio: false,
            responsive: true
          }} 
        />
      </div>
    </div>
  );
};

export default SpendingsStatistic;
