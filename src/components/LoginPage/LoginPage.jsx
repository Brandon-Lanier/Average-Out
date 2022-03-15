import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import './LoginPage.css'

function LoginPage() {
  const history = useHistory();

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LoginForm />

        <Button 
        variant="outlined"
        onClick={() => history.push('/registration')}
        sx={{mt: 3}}
        >
        Register
        </Button>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>

      </Container>
    </>
  );
}

export default LoginPage;
