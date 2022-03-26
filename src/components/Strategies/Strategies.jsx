import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { AccordionActions, Button, Slide, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Strategies() {

    const history = useHistory();

    const goEqual = () => {
        history.push('/calculate')
    }

    const [open, setOpen] = useState(true)

    return (
     
        <div id="strategies-container">
        <Accordion elevation={6} sx={{mt: 3, mb: 2}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: '#fff'}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{backgroundColor: '#47688d', color: '#fff'}}
        >
          <Typography variant="h5">Equal Parts Sale</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="b1" sx={{mt: 1}}>
            Sell an evenly split percentage from multiple stacks to hit a target return.
            </Typography>
            <hr></hr>
            <Typography variant="b1"sx={{mt: 1}} >
            Great for quick cash outs using multiple assets!
          </Typography>
        </AccordionDetails>
        <AccordionActions>
            <Button onClick={goEqual} variant='contained' color='primary'>Use This Strategy</Button>
        </AccordionActions>
      </Accordion>
      <Accordion elevation={6} sx={{mb: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: '#fff'}}/>}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{backgroundColor: '#47688d', color: '#fff'}}
        >
          <Typography variant="h5">Target Return %</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Specify a return percentage over a selected duration and we calculate how much to sell daily!
            </Typography >
        </AccordionDetails>
        <AccordionActions>
            <Button variant='contained' color='primary'>Use This Strategy</Button>
        </AccordionActions>
      </Accordion>
      <Accordion elevation={6} sx={{mb: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: '#fff'}}/>}
          aria-controls="panel3a-content"
          id="panel3a-header"
          sx={{backgroundColor: '#47688d', color: '#fff'}}
        >
          <Typography variant="h5">Sell % Of Holdings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sell a percent of total holdings across multiple assets for a specified duration.
            </Typography>
          <AccordionActions>
            <Button onClick={goEqual} variant='contained' color='primary'>Use This Strategy</Button>
        </AccordionActions>
        </AccordionDetails>
      </Accordion>
     
        </div>
     
    )
}

export default Strategies;