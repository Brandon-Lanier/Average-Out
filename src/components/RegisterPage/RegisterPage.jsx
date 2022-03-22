import React from 'react';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import loginlogo from '../LoginPage/loginlogo.PNG'
import { Typography, Box } from '@mui/material';
import './RegisterPage.css'

function RegisterPage() {
  const history = useHistory();

  return (
<>
    <div className="registration-container">
      <img src={loginlogo} alt="logo" className="login-logo" />
      <Box>
        <RegisterForm />
      </Box>
      <Typography variant="b1" sx={{mt: 2}}>
        Already a member?
      </Typography>
      <Button
        variant="outlined"
        onClick={() => history.push('/login')}
        sx={{ mt: 2 }}
      >
        Log In
      </Button>
    </div>
    </>
  );
}

export default RegisterPage;
