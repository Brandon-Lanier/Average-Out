import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import reacticon from './images/icons8-react-50-2.png';
import reduxicon from './images/icons8-redux-50.png';
import nodeicon from './images/icons8-nodejs-50.png';
import jsicon from './images/icons8-javascript-50.png';
import postgresql from './images/icons8-postgresql-50.png';
import muiicon from './images/icons8-material-ui-50.png';
import htmlicon from './images/icons8-html-50.png';
import cssicon from './images/icons8-css-50.png'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Box>
        <Typography variant="h5">
          Built with the following tech stacks:
        </Typography>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <img src={reacticon} alt="react" className="image-icon" />
        <img src={reduxicon} alt="redux" className="image-icon"/>
        <img src={nodeicon} alt="node" className="image-icon" />
        <img src={jsicon} alt="javascript" className="image-icon" />
        <img src={postgresql} alt="postgresql" className="image-icon" />
        <img src={muiicon} alt="mui" className="image-icon" />
        <img src={htmlicon} alt="html" className="image-icon" />
        <img src={cssicon} alt="css" className="image-icon" />
        </Box>
    </Box>
  );
}

export default AboutPage;
