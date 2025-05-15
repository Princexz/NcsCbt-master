import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Chart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Rank Type 1',
        data: [18000, 22000, 25000, 30000, 26000, 22000, 19000, 21000, 24000, 28000, 31000, 35000],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Rank Type 2',
        data: [15000, 20000, 23000, 27000, 24000, 19000, 16000, 18000, 21000, 25000, 28000, 32000],
        borderColor: 'green',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 10000,
        max: 40000,
        ticks: {
          stepSize: 5000,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
