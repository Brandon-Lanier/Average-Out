import TableCell from '@mui/material/TableCell';


function CoinItem({ coin }) {

   
    return (
        <>
        
            <TableCell align="left"><img src={coin.image} width="20px" height="20px" /> {coin.name}</TableCell>
            <TableCell align="left">{coin.symbol.toUpperCase()}</TableCell>
            <TableCell align="left">${coin.current_price.toFixed(2)}</TableCell>
            <TableCell align="left">{coin.price_change_percentage_24h.toFixed(2)}%</TableCell>

        </>
    )
}


export default CoinItem;