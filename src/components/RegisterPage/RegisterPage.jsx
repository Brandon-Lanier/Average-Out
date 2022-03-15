import React from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <RegisterForm />

        <Button
        variant="outlined"
        onClick={() => history.push('/login')}
        sx={{mt: 3}}
        >
        Log In
        </Button>
    
    
    </Container>
  );
}

export default RegisterPage;
