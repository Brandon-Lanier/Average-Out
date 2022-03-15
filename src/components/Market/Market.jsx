import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CoinItem from '../CoinItem/CoinItem';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function Market() {

  const marketData = useSelector(store => store.market);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MARKET' })
  }, [])


  const handleClick = (coin) => {
    console.log(coin.id);
    history.push(`/details/${coin.id}`)
}

  return (

    // <div style={{ height: 600, width: '100%' }}>
    //   <DataGrid
    //     rows={marketData}
    //     columns={columns}
    //     pageSize={10}
    //     rowsPerPageOptions={[10]}
    //   />
    // </div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 300 }} stickyHeader aria-label="simple table">
      <TableHead>
        <TableRow>
          {/* <TableCell align="left" sx={{width: '10px'}}>Logo</TableCell> */}
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Symbol</TableCell>
          <TableCell align="left">Current Price</TableCell>
          <TableCell align="left">% Change</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {marketData.map((coin) => (
          <TableRow
            key={coin.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onClick={() => handleClick(coin)}
          >
            <CoinItem 
              coin={coin}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Market;