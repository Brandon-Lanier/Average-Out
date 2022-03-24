import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { AccordionActions, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useHistory } from 'react-router-dom';

function Strategies() {

    const history = useHistory();

    const goEqual = () => {
        history.push('/calculate')
    }

    return (
        <div id="strategies-container">
        <Accordion elevation={6} sx={{mt: 3}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Equal Parts Sale</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sell an evenly split percentage from multiple stacks to hit a target return.
            </Typography>
            <hr></hr>
            <Typography>
            Great for quick cash outs using multiple assets!
          </Typography>
        </AccordionDetails>
        <AccordionActions>
            <Button onClick={goEqual} variant='contained' color='primary'>Use This Strategy</Button>
        </AccordionActions>
      </Accordion>
      <Accordion elevation={6}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h5">Target Return %</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Specify a return percentage over a selected duration and we calculate how much to sell daily!
            </Typography>
            <hr></hr>
            <Typography>
            Currently under production!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={6}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography variant="h5">Sell % Of Holdings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sell a percent of total holdings across multiple assets for a specified duration.
            </Typography>
            <hr></hr>
            <Typography>
            Currently under production!
          </Typography>
        </AccordionDetails>
      </Accordion>

        </div>

    )
}

export default Strategies;