import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
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
        <h2>{heading}</h2>
        <RegisterForm />
        <h4>Already a Member?</h4>
        <Button variant="outlined" onClick={onLogin} >Login</Button>
      </Container>

    </>
  );
}

export default LandingPage;
