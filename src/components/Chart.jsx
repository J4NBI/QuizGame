import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

const PieChart = ({ counts }) => {
  // Registrierung notwendig ab Chart.js v4
  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
  const percentCorrect = (counts.correct / counts.length) * 100;
  const percentWrong = (counts.wrong / counts.length) * 100;
  const data = {
    labels: ["Write", "Wrong"],
    datasets: [
      {
        label: "Stimmen",
        data: [percentCorrect, percentWrong],
        backgroundColor: ["#1ac6ac", "#ffa51a"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF", // Farbe der Legende
        },
      },
      datalabels: {
        color: "#fff", // Farbe der Zahl auf der Torte
        formatter: (value, context) => {
          // Berechne den Prozentsatz
          const dataset = context.chart.data.datasets[0];
          const total = dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(1) + "%";
          return percentage;
        },
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  return (
    <div className="mb-12">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
