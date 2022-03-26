import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CoinItem from '../CoinItem/CoinItem';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Slide, TableRow, TableHead, TableContainer, TableBody, Table, Typography, Autocomplete, TextField, Backdrop, CircularProgress, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';


function Market() {

  const marketData = useSelector(store => store.market);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MARKET' }) // Get all the market data upon loading page.
  }, [])


  // Go to Coin details page
  const handleClick = (coin) => {
    history.push(`/details/${coin.id}`)
  }

  // Handles when a search item is clicked on, go to details page
  const handleSearch = (coin) => {
    history.push(`/details/${coin}`)
  }

  // Handles opening and closing the backdrop when loading
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  // Styled table classes
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#364f6b",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
   // Styled table classes
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  return (
    <>
    {marketData.length === 0 ? 
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      :
      <Slide direction="up" in="open" mountOnEnter unmountOnExit>
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
  }
    </>
  )
}

export default Market;