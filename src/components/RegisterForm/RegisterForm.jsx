import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (

    <Card sx={{ width: 350 }} >
      <CardContent>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>)}
        <Stack spacing={4}>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Stack>
      </CardContent>
      <CardActions className="cardActions" >
        <Button 
        onClick={registerUser} 
        variant="contained" 
        size="medium"
        sx={{mb: 3}}>
        Register
        </Button>
      </CardActions>
    </Card>
  )
}

export default RegisterForm;
{/* <form className="formPanel" onSubmit={registerUser}>
<h2>Register User</h2>
{errors.registrationMessage && (
  <h3 className="alert" role="alert">
    {errors.registrationMessage}
  </h3>
)}
<div>
  <label htmlFor="username">
    Username:
    <input
      type="text"
      name="username"
      value={username}
      required
      onChange={(event) => setUsername(event.target.value)}
    />
  </label>
</div>
<div>
  <label htmlFor="password">
    Password:
    <input
      type="password"
      name="password"
      value={password}
      required
      onChange={(event) => setPassword(event.target.value)}
    />
  </label>
</div>
<div>
  <input className="btn" type="submit" name="submit" value="Register" />
</div>
</form>
); */}