import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { Button, Typography, Input } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import './LoginForm.css'


function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login


  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);


  return (
    <>
      <Card sx={{ width: 290 }} id="login-card">
        <CardContent>
          <Typography variant="h5" sx={{mb: 2, textAlign: 'center'}}>Login</Typography>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <Stack spacing={3}>
            <TextField
              id="username"
              label="Username"
              variant="standard"
              value={username}
              autoComplete="off"
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          <FormControl variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <Input
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            autoComplete="off"
            
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
          </Stack>
        </CardContent>
        <CardActions className="cardActions" >
          <Button onClick={login} variant="contained" size="medium" sx={{mb: 2}}>Log In</Button>
        </CardActions>
      </Card>
    </>
  )
}

export default LoginForm;


{/* <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
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
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form> */}



            // <TextField
            //   id="password"
            //   label="Password"
            //   variant="standard"
            //   type="password"
            //   autoComplete="off"
            //   value={password}
            //   required
            //   onChange={(event) => setPassword(event.target.value)}
            // />