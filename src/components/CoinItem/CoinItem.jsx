
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';


function CoinItem({ coin }) {

    const history = useHistory();


   
    return (
        <>
            <TableCell component="th" scope="row">
                <img src={coin.image} width="20px" height="20px" />
            </TableCell>
            <TableCell align="center">{coin.name}</TableCell>
            <TableCell align="center">{coin.symbol}</TableCell>
            <TableCell align="center">${coin.current_price.toFixed(2)}</TableCell>
            <TableCell align="center">{coin.price_change_percentage_24h.toFixed(2)}%</TableCell>

        </>
    )
}


export default CoinItem;