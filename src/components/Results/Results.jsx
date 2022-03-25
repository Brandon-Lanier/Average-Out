import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
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
import ExecuteModal from '../ExecuteModal/ExecuteModal';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';




function Results() {

    const dispatch = useDispatch();
    const history = useHistory();

    const result = useSelector(store => store.calculate);

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

    const handleExecute = () => {
                dispatch({type: 'EXECUTE_CALCULATION', payload: result})
                dispatch({type: 'ClEAR_RESULT'})
                dispatch({type: 'GET_ASSETS'})
                history.push('/portfolio')  
    }

    const handleCancel = () => {
        dispatch({type: 'CLEAR_RESULTS'});
        history.push('/portfolio');
    }


    console.log(result);
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw', mt: 3 }}>
            <Typography variant="h5">
                Target Return: ${result[0]?.target}
            </Typography>
            <Typography variant="b1">
                Total Duration: {result[0]?.days} {result[0]?.days > 1 ? <span>days.</span> : <span>time.</span>}
            </Typography>
            <Typography variant="h5" sx={{mt: 3}}>
                Amount To Sell Today:
            </Typography>
            <TableContainer component={Paper} sx={{mt: 1}}>
                <Table sx={{ minWidth: 300 }} aria-label="result-table">
                    <TableHead >
                        <StyledTableRow>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Quantity To Sell</StyledTableCell>
                            <StyledTableCell align="left">Dollar Amount</StyledTableCell>
                            <StyledTableCell align="left">% Of Asset</StyledTableCell>
                        </StyledTableRow>
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
                                <TableCell align="left">{(coin?.percentage * 100).toFixed(2)}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2} sx={{mt: 3}}>
                <ExecuteModal handleExecute={handleExecute} result={result}/>
            {/* <Button variant="contained" onClick={handleExecute}>Execute</Button> */}
            <Button onClick={handleCancel} color="primary" variant="outlined">Cancel</Button>
            </Stack>
        </Container>

    )
}

export default Results;