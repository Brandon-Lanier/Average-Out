import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Box, InputBase } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Grow from '@mui/material/Grow';
import { Slide } from "@mui/material";
import { useHistory } from "react-router-dom";



function Calculate() {

    const assets = useSelector(store => store.assets)
    const market = useSelector(store => store.market)
    const assetDetails = useSelector(store => store.assetDetails)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_ASSETS' })
        setCoinOptions(assets)
    }, [dispatch]);

    const [targetValue, setTargetValue] = useState('');
    const [duration, setDuration] = useState('');
    const [coinOptions, setCoinOptions] = useState([]);
    const [selectCoin, setSelectCoin] = useState([]);
    const [runningTotal, setRunningTotal] = useState(0)

    const handleSelect = (coin) => {
        setSelectCoin([...selectCoin, coin])
        setCoinOptions(coinOptions.filter(item => item.id !== coin.coin_id));
        let totalVal = coin.quantity * coin.current_price
        setRunningTotal(runningTotal + totalVal)
    }

    const handleCalculate = () => {
        console.log(targetValue, duration, selectCoin);
        let calculation = {
            target: targetValue,
            days: duration,
            coins: selectCoin
        }
        dispatch({type: 'SEND_CALCULATION', payload: calculation})
        history.push('/results');
    }

    console.log(runningTotal);

    return (
        <div>
            <Slide direction="left" in="open" mountOnEnter unmountOnExit>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5">
                        How much would you like to sell?
                    </Typography>

                    <TextField
                        error={runningTotal < targetValue}
                        id="amount"
                        label="Sell Amount"
                        variant="standard"
                        value={targetValue}
                        type="number"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MonetizationOnIcon />
                              </InputAdornment>
                            ),
                          }}
                        onChange={((e) => setTargetValue(e.target.value))}
                    />
                    <br></br>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="duration">Duration</InputLabel>
                            <Select
                                labelId="duration"
                                id="duration"
                                value={duration}
                                label="Duration"
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <MenuItem value={1}>Sell Today</MenuItem>
                                <MenuItem value={7}>1 Week</MenuItem>
                                <MenuItem value={14}>2 Weeks</MenuItem>
                                <MenuItem value={30}>1 Month</MenuItem>
                                <MenuItem value={60}>2 Months</MenuItem>
                                <MenuItem value={182}>6 Months</MenuItem>
                                <MenuItem value={365}>1 Year</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Typography variant="b2">
                            Which assets would you like to sell?
                        </Typography>
                        <Grow
                            in={open}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(open ? { timeout: 1000 } : {})}
                        >
                            <Stack spacing={2} sx={{ mt: 2 }}>

                                {coinOptions?.map((coin) => (
                                    <Chip
                                        avatar={<Avatar alt={coin.id} src={coin.image} />}
                                        label={coin.name}
                                        variant="outlined"
                                        onClick={() => handleSelect(coin)}
                                    />
                                ))}


                            </Stack>
                        </Grow>
                        <Typography variant="b2">
                            Selected Assets:
                        </Typography>
                        <Grow
                            in={open}
                            style={{ transformOrigin: '0 0 0' }}
                            {...(open ? { timeout: 1000 } : {})}
                        >
                            <Stack spacing={2} sx={{ mt: 3 }}>
                                {selectCoin.map((el) => (
                                    <Chip
                                        avatar={<Avatar alt={el.id} src={el.image} />}
                                        label={el.name}
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                        </Grow>
                    
                        <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
                            <Button variant='outlined'>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={handleCalculate}>
                                Calculate
                            </Button>
                        </Stack>
                        
                    </Box>
                </Container>
            </Slide>
        </div >
    )
}

export default Calculate;