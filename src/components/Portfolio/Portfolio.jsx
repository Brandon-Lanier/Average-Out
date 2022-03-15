import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import PieChart from "../PieChart/PieChart.jsx"
import { useHistory } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';



function Portfolio() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({type: 'FETCH_MARKET'})
      dispatch({type: 'GET_ASSETS'})
    }, []);

    const history = useHistory()
    
    const assets = useSelector(store => store.assets)
    const market = useSelector(store => store.market)

    const totalValue = [];
    const [value, setValue] = useState([]);

    const getValue = (coinid, quantity, market) => {
        const filteredCoin = market.filter((el) => el.id === coinid)
        const price = filteredCoin[0].current_price;
        const total = Number(price * quantity).toFixed(2);
        totalValue.push(Number(total))
        // setValue(...value, total)
        dispatch({type: 'SET_TOTAL', total});
        console.log(value);
        return total;
    }
        
        // const renderTotal = () => {
        //     const total = totalValue.reduce((a, b) => a + b, 0)
        //     console.log('total value', total);
        //     return total;
        // }


    return (
        <>
        <CssBaseline />
        <Container maxWidth="sm">
            <p>$</p>
            <PieChart
            />
            <table>
                <thead>
                    <th>Coin</th>
                    <th>Quantity</th>
                    <th>Value</th>
                </thead>
                <tbody>
                    
                        {assets.map((coin) => (
                          <tr key={coin.coin_id}>
                            <td>{coin?.coin_id}</td>
                            <td>{coin?.quantity}</td>
                            <td>${getValue(coin.coin_id, coin.quantity, market)}</td>
                         </tr>
                        )
                        )}
                    
                </tbody>

            </table>
        </Container>
        </>
           
        

    )
}

export default Portfolio;