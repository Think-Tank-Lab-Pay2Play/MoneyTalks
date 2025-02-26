import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
      const labels = data.map((item) => item.luna);
      const values = data.map((item) => item.suma);

      setChartData({
        labels,
        datasets: [
          {
            label: "Cheltuieli lunare",
            data: values,
            borderColor: "#FFF200",
            backgroundColor: "#FFF200",
            pointBackgroundColor: "#000000",
            pointRadius: 5,
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default SpendingsStatistic;
