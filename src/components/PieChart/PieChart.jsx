import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './PieChart.css'


function PieChart() {


    const assets = useSelector(store => store.assets)
    // let test = [{id: 1, name: "Bitcoin", quantity: "17.8200", symbol: "btc", user_id: 1}, {id: 2, name: "Ethereum", quantity: "13.8200", symbol: "eth", user_id: 1}]
    let graphData = [];

 
   
 
    const assetSplit = () => {
        for (let coin of assets) {
            graphData.push(coin.quantity)
        }
        return graphData;
    }

    let graphNames = [];

    let nameSplit = () => {
        for (let coin of assets) {
            graphNames.push(coin.name)
        }
        return graphNames;
    }

    return (
    <div className="pie-container">
        <Pie
        data={{
            labels: nameSplit(),
            datasets: [
            {
              label: 'Asset Distribution',
              data: assetSplit(),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
          
        }}
       
        options={{
            plugins: {
              legend: {
                  position: 'bottom'
              },
            },
            responsive: true,
            animation: {
                animateScale: true,
                animateRotate: true
            },
            maintainAspectRatio: true,
            title: {
                display: true,
                text: 'Asset Distribution'
            }
          }}
        />
        </div>
    )
}


export default PieChart;