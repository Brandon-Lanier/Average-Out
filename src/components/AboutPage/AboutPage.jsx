import React from 'react';
import { Stack, Typography } from '@mui/material';
import reacticon from './images/icons8-react-50-2.png'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      
        <Typography variant="h5">
          Built with the following tech stacks:
        </Typography>
        <Stack spacing={1}>
        <img src={reacticon} alt="react" />
        
        </Stack>
 
    </div>
  );
}

export default AboutPage;
