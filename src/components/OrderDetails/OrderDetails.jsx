import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



function OrderDetails() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({type: 'GET_ORDER_DETAILS', payload: Number(id) })
    }, [])

    const order = useSelector(store => store.orderDetails)

    const handleExecute = () => {
        dispatch({type: 'EXECUTE_NEW_DAY', payload: order})
        history.push('/portfolio')
    }

    const handleSkip = () => {
        dispatch({type: 'SKIP_DAY', payload: order})
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
    

    console.log(id);
    return (
        <>
        {order === {} ?
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          :
       
        <div>
            <ChevronLeftIcon sx={{ fontSize: 50, mt: 3 }} onClick={() => history.goBack()} />
            <Card sx={{ minWidth: 300 }} elevation={6}>
                <CardContent>
                    <Typography variant="h6">
                        Target Return: ${order[0]?.target.toLocaleString(undefined, {maximumFractionDigits:2})}
                    </Typography>
                    <Typography variant="b2">
                        Days Remaining: {order[0]?.days_left}
                    </Typography>
                    <TableContainer component={Paper} sx={{mt: 2}}>
                        <Table sx={{ minWidth: 200 }} aria-label="order-details-table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell align="left">Asset</StyledTableCell>
                                    <StyledTableCell align="left">Qty To Sell Today</StyledTableCell>
                                    <StyledTableCell align="left">Dollar Amount</StyledTableCell>
                                    <StyledTableCell align="left">% Of Asset</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {order.map((row) => (
                                    <StyledTableRow
                                        key={row?.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {row?.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="left">{row?.qtyToSell.toFixed(4)}</StyledTableCell>
                                        <StyledTableCell align="left">${row?.sellDollarAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</StyledTableCell>
                                        <StyledTableCell align="left">{(row?.percentage * 100).toFixed(2)}%</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button size="small" color="primary" variant="outlined" onClick={handleSkip}>Skip Today</Button>
                    <Button size="small" color="primary" variant="contained" onClick={handleExecute}>Execute</Button>
                </CardActions>
            </Card>
        </div >
         }
        </>
    )
}

export default OrderDetails;