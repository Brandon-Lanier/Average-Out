import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import loginLogo from './loginlogo.PNG'
import './LoginPage.css'

function LoginPage() {
  const history = useHistory();

  return (
    <>
      {/* <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center', height: '100%' }}> */}
      <div className="login-container" >
      <Box sx={{mt: 15}}>
        <img src={loginLogo} alt="logo" className="login-logo" />
        
          <LoginForm />
        </Box>
        <Typography variant="b1" sx={{mt: 2}}>
          New around here?
        </Typography>
        <Button
          variant="outlined"
          onClick={() => history.push('/registration')}
          sx={{ mt: 1 }}
        >
          Register
        </Button>
        {/* <Button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button> */}
      </div>
      {/* </Container> */}
    </>
  );
}

export default LoginPage;
