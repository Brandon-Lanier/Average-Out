import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CoinItem from '../CoinItem/CoinItem';
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Slide, Typography } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';



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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#364f6b",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [selectedCoin, setSelectedCoin] = useState('')

  const handleSearch = (coin) => {
    history.push(`/details/${coin}`)
  }

  return (
    <>
      <Slide direction="right" in="open" mountOnEnter unmountOnExit>
        <Container sx={{display: 'flex', flexDirection: "column", alignItems: 'center'}}>
          <Typography variant="h5" sx={{mt: 1}}>
            Crypto Market
          </Typography>
          <Autocomplete
            id="coinsearch"
            freeSolo
            fullWidth
            options={marketData?.map((option) => option.id)}
            onChange={(event, value) => handleSearch(value)}
            sx={{mt: 1, mb: 3}}
            renderInput={(params) => <TextField {...params} label="Search Coins" />}
          />
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} stickyHeader aria-label="market-table">
            <TableHead sx={{backgroundColor: "#67ced4"}}>
              <StyledTableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Symbol</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Change</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {marketData.map((coin) => (
                <StyledTableRow
                  key={coin.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => handleClick(coin)}
                >
                  <CoinItem
                    coin={coin}
                  />
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Container>
      </Slide>
    </>
  )
}

export default Market;