import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Container, Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



function Results() {

    const dispatch = useDispatch();
    const history = useHistory();

    const result = useSelector(store => store.calculate);

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
          margin: 1,
          padding: 0,
          transform: 'translateX(6px)',
          '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
              )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            }
        }
    }
}
))


    const handleExecute = () => {
        if
            (confirm('This will actually execute the transaction from your portfolio..blah blah blah')) {
                console.log('You Have Executed The Order');
        }
    }

    const handleCancel = () => {
        dispatch({type: 'CLEAR_RESULTS'});
        history.push('/portfolio');
    }


    console.log(result);
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6">
                Amount To Sell Today:
            </Typography>
            <Typography variant="b1">
                {result[0].total}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 380 }} stickyHeader aria-label="result table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Quantity To Sell</TableCell>
                            <TableCell align="left">Dollar Amount</TableCell>
                            <TableCell align="left">% Of Asset</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result?.map((coin) => (
                            <TableRow
                                key={coin.coinid}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{coin?.name}</TableCell>
                                <TableCell align="left">{coin?.qtyToSell.toFixed(4)}</TableCell>
                                <TableCell align="left">${coin?.sellDollarAmount.toLocaleString(undefined, {maximumFractionDigits:2})}</TableCell>
                                <TableCell align="left">{coin?.percentage.toFixed(2)}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={3} sx={{mt: 3}}>
            <Button variant="contained" onClick={handleExecute}>Execute</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </Stack>
        </Container>

    )
}

export default Results;