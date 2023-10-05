import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import realAssistIcon from './assets/realAssist_icon.PNG'
import crimeIcon from './assets/crime_icon.PNG'
const labels = [];

const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [],
    },
  ],
};

const GraphComponent = () => {
  const [chartData, setChartData] = useState(data);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv');
      const result = await response.json();
      var labels = [];
      var values = [];
      for(var i=0;i<result.data.length;i++){
        const graph_data = result.data[i];
        console.log(graph_data);
        labels.push(graph_data.data_year);
        values.push(graph_data.Burglary);
      }
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Bluglary',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: '#1463FF',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className="flex flex-col justify-between w-full p-4" id='graph'>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <img src={realAssistIcon} />
          <span className="text-lg">RealAssist.AI</span>
        </div>
        <span className="text-md font-bold">123 Main Street, Dover, NH 03820-4667</span>
      </div>
      <div className="mt-2 w-full h-[3px] bg-gradient-to-r from-[#005DFF] to-[#21DDFF]"></div>
      <div className="mt-8 rounded-xl flex flex-col bg-[#E3E7F1]">
        <div className="rounded-t-xl bg-[#E8EEFB] py-4 px-4 text-[#1463FF]"></div>
        <div className="px-8 py-4">
          <div className="flex bg-white rounded-xl px-8 py-4 justify-center min-h-[150px] items-center">
            <div className="rounded-full bg-gradient-to-r from-[#1A56DB] to-[#1A56DB55] text-white font-bold py-2 text-center w-1/2">Only Focus on Crime Graph</div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between space-x-4">
        <div className="flex space-x-2 items-center">
          <img src={crimeIcon} />
          <span>Crime</span>
        </div>
        <div className="w-full h-[3px] bg-gradient-to-r from-[#005DFF] to-[#21DDFF]"></div>
      </div>
      <div className="mt-2 rounded-xl flex flex-col bg-[#E3E7F1]">
        <div className="rounded-t-xl bg-[#E8EEFB] py-2 px-4 text-[#1463FF]">Burglary</div>
        <div className="px-8 py-4">
          <div className="bg-white rounded-xl px-8 py-4">
            <Line className='w-full max-h-[300px]' data={chartData} />
          </div>
        </div>
      </div>
      <div className="mt-8 w-full h-[3px] bg-gradient-to-r from-[#005DFF] to-[#21DDFF]"></div>
      <div className="flex items-center justify-between">
        <span className="text-md font-bold text-[#1463FF]">Report Genereted on September 26, 2023</span>
        <span className="text-md font-bold">RealAssist Property Report | Page 1 of 25</span>
      </div>
    </div>
  );
};

export default GraphComponent;