import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import axiosInstance from "../../Axios/AxiosInstance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchRevenueAndCredit = async () => {
      try {
        const response = await axiosInstance.get("/admin/revenueChart");
        const { day, week, month, year, last90Days } = response.data;

        setChartData({
          labels: ["Day", "Week", "Month", "Year", "Last 90 Days"],
          datasets: [
            {
              label: "Total Revenue",
              data: [
                day.revenue,
                week.revenue,
                month.revenue,
                year.revenue,
                last90Days.revenue,
              ],
              backgroundColor: "rgba(153, 102, 255, 0.8)",
              borderColor: "rgba(153, 102, 255, 1)",
            },
            {
              label: "Total Credit",
              data: [
                day.credit,
                week.credit,
                month.credit,
                year.credit,
                last90Days.credit,
              ],
              backgroundColor: "rgba(255, 159, 64, 0.8)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching revenue and credit data:", error);
      }
    };

    fetchRevenueAndCredit();
  }, []);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "10px",
      }}
      className="mt-10 bg-[#212529] rounded-lg"
    >
      <h2 style={{ textAlign: "left", marginBottom: "20px" }}>
        Revenue and Credit.
      </h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Revenue and Credit" },
          },
          animation: {
            duration: 2000,
            easing: "easeOutQuad",
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 12 } },
            },
            y: {
              beginAtZero: true,
              grid: { display: true },
              ticks: { font: { size: 12 } },
            },
          },
          barPercentage: 0.5,
          categoryPercentage: 0.5,
        }}
      />
    </div>
  );
};

export default RevenueChart;
