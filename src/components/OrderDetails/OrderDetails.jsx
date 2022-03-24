import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';



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

    console.log(id);
    return (
        <div>
            <ChevronLeftIcon sx={{ fontSize: 50, mt: 3 }} onClick={() => history.goBack()} />
            <Card sx={{ minWidth: 300 }} elevation={6}>
                <CardContent>
                    <Typography variant="h6">
                        Target Return: ${order[0]?.target.toLocaleString(undefined, {maximumFractionDigits:2})}
                    </Typography>
                    <Typography variant="b1">
                        Days Remaining: {order[0]?.days_left}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="order-details-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Asset</TableCell>
                                    <TableCell align="left">Qty To Sell Today</TableCell>
                                    <TableCell align="left">Dollar Amount</TableCell>
                                    <TableCell align="left">% Of Asset</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.map((row) => (
                                    <TableRow
                                        key={row?.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.name}
                                        </TableCell>
                                        <TableCell align="left">{row?.qtyToSell.toFixed(4)}</TableCell>
                                        <TableCell align="left">${row?.sellDollarAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                                        <TableCell align="left">{(row?.percentage * 100).toFixed(2)}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button size="small" color="primary" variant="outlined">Skip Today</Button>
                    <Button size="small" color="primary" variant="contained" onClick={handleExecute}>Execute</Button>
                </CardActions>
            </Card>
        </div >
    )
}

export default OrderDetails;