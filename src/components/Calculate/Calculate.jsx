import { Container } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Box, InputBase } from "@mui/material";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function Calculate() {

    const assets = useSelector(store => store.assets)
    const market = useSelector(store => store.market)
    const assetDetails = useSelector(store => store.assetDetails)


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_ASSETS' })
    }, []);

    const [targetValue, setTargetValue] = useState('');
    const [duration, setDuration] = useState('')


    return (
        <div>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5">
                    How much would you like to sell?
                </Typography>

                <TextField
                    id="amount"
                    label="Sell Amount"
                    variant="standard"
                    value={targetValue}
                    type="number"
                    onChange={((e) => setTargetValue(e.target.value))}
                />
                <br></br>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={duration}
                            label="Age"
                            onChange={(e) => setDuration(e.target.value)}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Typography variant="b2">
                        Which assets would you like to sell?
                    </Typography>
                    <Stack spacing={2}>
                        {assets.map((coin) => (
                            <Chip
                                avatar={<Avatar alt={coin.id} src={coin.image} />}
                                label={coin.name}
                                variant="outlined"
                            />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </div>
    )
}

export default Calculate;