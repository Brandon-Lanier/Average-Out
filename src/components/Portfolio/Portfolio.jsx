import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import PieChart from "../PieChart/PieChart.jsx"
import { useHistory } from "react-router-dom";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Typography, Paper, TableRow, TableHead, TableContainer, TableBody, Table, Container, Slide, Link } from "@mui/material";
import { styled } from '@mui/material/styles';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';



function Portfolio() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MARKET' });
    dispatch({ type: 'GET_ASSETS' });
    dispatch({ type: 'GET_ORDERS' })
    dispatch({ type: 'FETCH_GLOBAL' })
  }, []);

  // Styled table declaration
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#364f6b",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  // Styled table declaration
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const history = useHistory();

  // Reducer Central //
  const assets = useSelector(store => store.assets)
  const market = useSelector(store => store.market)
  const user = useSelector(store => store.user)

  const handleClick = (coin) => {
    history.push(`/details/${coin.coin_id}`)
  }

  let totalValue = []; // Holding array of all individual coin values before reducing for total

  // Add's up all current value's of each holding to display total portfolio value.
  const getSum = () => {
    let runningTotal = 0
    for (let coin of assets) {
      runningTotal = coin.quantity * coin.current_price;
      totalValue.push(runningTotal)
    }
    totalValue = totalValue.reduce((a, b) => a + b, 0);
    return totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  return (
    <>
      <Slide direction="up" in="open" mountOnEnter unmountOnExit>
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw' }}>
          {assets?.length === 0
            ?
            <>
              <Typography variant="h5" sx={{ mt: 6, textAlign: 'center' }}>
                Hello, {user.firstname}.
              </Typography>
              <Typography variant="h5" sx={{ mt: 10, textAlign: 'center' }}>
                Your portfolio looks empty.  Head over to the market to add some assets.
              </Typography>
            </>
            :
            <>
              <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                Portfolio Value: ${getSum()}
              </Typography>
              <PieChart />
              <Typography variant="h6" sx={{ mt: 1 }}>
                Portfolio Summary
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300, p: 0, width: '100%' }} aria-label="portfolio">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#67ced4" }}>
                      <StyledTableCell align="center">Name</StyledTableCell>
                      <StyledTableCell align="center">Quantity</StyledTableCell>
                      <StyledTableCell align="center">Value</StyledTableCell>
                      <StyledTableCell align="center">Change</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assets?.map((coin) => (
                      <StyledTableRow
                        key={coin.id}
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={() => handleClick(coin)}
                      >
                        <StyledTableCell align="left">{coin?.name}</StyledTableCell>
                        <StyledTableCell align="left">{coin?.quantity}</StyledTableCell>
                        <StyledTableCell align="left">${(coin?.quantity * coin?.current_price).toLocaleString(undefined, { maximumFractionDigits: 2 })}</StyledTableCell>
                        <StyledTableCell align="left">{coin?.price_change_percentage_24h > 0
                          ?
                          <ArrowDropUpRoundedIcon color="success" />
                          :
                          <ArrowDropDownRoundedIcon color="error" />}
                          {coin.price_change_percentage_24h.toFixed(2)}%</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          }
        </Container>
      </Slide>
    </>
  )
}

export default Portfolio;

