import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import PieChart from "../PieChart/PieChart.jsx"
import { useHistory } from "react-router-dom";
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";



function Portfolio() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({type: 'FETCH_MARKET'})
      dispatch({type: 'GET_ASSETS'})
    }, [dispatch]);

    const history = useHistory()
    
    const assets = useSelector(store => store.assets)
    const market = useSelector(store => store.market)
    const totalVal = useSelector(store => store.total)

    const totalValue = [];

    const [value, setValue] = useState([]);

    const getValue = (coinid, quantity, market) => {
        const filteredCoin =  market.filter((el) => el.id === coinid)
        const price = filteredCoin[0]?.current_price;
        const total = Number(price * quantity).toFixed(2);
        totalValue.push(Number(total))
        // setValue(currentValues => [...currentValues, total])
        console.log(value);
        return total;
    }

    


        
        // const renderTotal = () => {
        //     const total = totalValue.reduce((a, b) => a + b, 0)
        //     console.log('total value', total);
        //     return total;
        // }
        const columns = [
            { field: 'coin_id', headerName: 'Coin', width: 140 },
            { field: 'quantity', headerName: 'Quantity', width: 130 },
        ]

        const handleClick = (coin) => {
            history.push(`/details/${coin.coin_id}`)
        }

        const getSum = () => {
            let sum = totalValue.reduce((a, b) => 1 + b, 0)
            return sum;
        }
        

    return (
        <>
        <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p>${}</p>
            <PieChart/>
            <Typography variant="h6">
                Portfolio Summary
            </Typography>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="Center">Name</TableCell>
            <TableCell align="Center">Quantity</TableCell>
            <TableCell align="Center">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assets?.map((coin) => (
            <TableRow
              key={coin.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleClick(coin)}
            >
              <TableCell align="left">{coin?.coin_id}</TableCell>
              <TableCell align="left">{coin?.quantity}</TableCell>
              <TableCell align="left">${getValue(coin.coin_id, coin.quantity, market)}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Container>
        </>
           
        

    )
}

export default Portfolio;


// <table>
// <thead>
//     <th>Coin</th>
//     <th>Quantity</th>
//     <th>Value</th>
// </thead>
// <tbody>
    
//         {assets.map((coin) => (
//           <tr key={coin?.coin_id}>
//             <td>{coin?.coin_id}</td>
//             <td>{coin?.quantity}</td>
//             <td>${getValue(coin.coin_id, coin.quantity, market)}</td>
//          </tr>
//         )
//         )}
    
// </tbody>

// </table>