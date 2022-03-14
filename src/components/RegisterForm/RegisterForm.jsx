import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>)}
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
      <Button onClick={registerUser}>Register</Button>
    </Box>
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