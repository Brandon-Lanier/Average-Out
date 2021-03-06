import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import './LandingPage.css';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
      <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h5" sx={{mb: 5}}>
          Welcome to Average Out
        </Typography>
        <RegisterForm />
        <h4>Already a Member?</h4>
        <Button variant="outlined" onClick={onLogin} >Login</Button>
      </Container>

    </>
  );
}

export default LandingPage;
