import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';




function LineChart({ coinid }) {

    const formatData = (data) => {
        return data.map(el => {
            return {
                x: el[0],
                y: Number(el[1].toFixed(2))
            }
        })
    }

    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=usd&days=30&interval=daily`)
            const data = await res.data.prices
            setGraphData(formatData(data))
        };
        fetchHistory();
    }, [])


    return (

   
  
            <Line 
                data={{
                    datasets: [{
                        label: `30 Day ${coinid} Price`,
                        data: graphData,
                        borderWidth: 2,
                        backgroundColor: '#5273ba',
                        pointRadius: 0,
                        borderColor: '#5273ba',
                        fill: {
                            target: origin
                        },
                    }] 
                }}
                options={{
                    lineHeightAnnotation: {
                        always: true,
                        hover: false,
                        lineHeight: 1.5
                    },
                    animation: {
                        duration: 1500
                    },
                    plugins: {
                        legend: false,
                    },
                     tooltips: {
                        enabled: false
                     },
                    scales: {
                        x: {
                          type: 'time',
                          time: {
                            minUnit: 'day'
                          },
                          distribution: 'linear'
                        },
                        // y: {
                        //   ticks: {
                        //     stepSize: 0,
                        //   },
                        // },
                      },
                      maintainAspectRatio: false,
                      responsive: true,
                      
                }}
                    height={200}

                />
       

    )
}

export default LineChart;

{/* <Line
data={{
    datasets: [
        {
            label: `1 Month`,
            data: [{x: 2, y: 15}],
            borderWidth: 1,
            pointRadius: 0,
        },
    ],
}}
options={{
    lineHeighAnnotation: {
        always: true,
        hover: false,
        lineWeight: 1.5
    },
    maintainAspectRatio: false,
    response: true,
    animations: {
        tension: {
            duration: 2000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
        },
    },
    scales: {
        x: {
            type: 'time',
            distribution: 'linear'
        },
        y: {
            beginAtZero: false,
        },
    },
}}
/> */}