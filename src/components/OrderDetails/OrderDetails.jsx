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



function OrderDetails() {

    const { orderid } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch({type: 'GET_ORDER_DETAIlS', payload: orderid })
    })

    const order = useSelector(store => store.orderDetails)

    console.log(order);
    return (
        <div>
            <Card sx={{ minWidth: 350 }}>
                <CardContent>
                    <Typography variant="h6">
                        Target Return: ${order[0].target}
                    </Typography>
                    <Typography variant="b1">
                        Days Remaining: {order[0].days_left}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 340 }} aria-label="order-details-table">
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
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">{row.qtyToSell.toFixed(4)}</TableCell>
                                        <TableCell align="left">${row.sellDollarAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                                        <TableCell align="left">{(row.percentage * 100).toFixed(2)}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardActions>
                    <Button size="small">Skip Today</Button>
                    <Button size="small">Execute</Button>
                </CardActions>
            </Card>
        </div >
    )
}

export default OrderDetails;