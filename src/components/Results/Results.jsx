import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { Container, Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';


function Results() {

    const result = useSelector(store => store.calculate);


    console.log(result);
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">
                Amount To Sell Today:
            </Typography>
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 380 }} stickyHeader aria-label="result table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Quantity To Sell</TableCell>
                            <TableCell align="left">Dollar Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result?.map((coin) => (
                            <TableRow
                                key={coin.coinid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{coin?.coinid}</TableCell>
                                <TableCell align="left">{coin?.qtyToSell.toFixed(4)}</TableCell>
                                <TableCell align="left">${coin?.sellDollarAmount.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={3} sx={{mt: 3}}>
            <Button variant="contained">Execute</Button>
                <Button>Cancel</Button>
            </Stack>
        </Container>

    )
}

export default Results;