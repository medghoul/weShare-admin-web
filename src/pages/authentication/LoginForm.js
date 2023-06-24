import React, { Fragment, useEffect, useState } from 'react';
import {
  InputLabel,
  Button,
  Grid,
  Paper,
  Typography,
  OutlinedInput,
  Avatar,
  FormControl,
  InputAdornment,
  IconButton,
  useTheme,
  Divider,
  Box,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Google from '../../images/icons/social-google.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios, { AxiosError } from 'axios';
import { useSignIn } from 'react-auth-kit';
import { json } from 'stream';
import Logo from '../../cards/Logo';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { tokens } from '../../theme';
import backgroundImage1 from '../../images/weshare-left.7317ad1f.png';
import backgroundImage2 from '../../images/weshare-right.16b9c9bb.png';
import {Link} from 'react-router-dom'
const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const paperStyle = {
    padding: 33,
    height: 'auto',
    width: 420,
    margin: '140px auto',
    borderRadius: 10,
  };
  const formStyle = {
    margin: `20px auto`,
    width: `-webkit-fill-available`,
  };
  const style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zindex: '-1',
    backgroundRepeat: `no-repeat,no-repeat`,
    backgroundAttachment: 'fixed',
    backgroundSize: '368px',
    backgroundPosition: `left bottom,right bottom`,
    backgroundColor: '#455b88',
    backgroundImage: `url(${backgroundImage1}),url(${backgroundImage2})`,
  };
  const stackStyle = {
    position: 'relative',
    bottom: '115px',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
  };

  const avatarStyle = {
    width: '80px',
    height: '80px',
    backgroundColor: '#1bbd7e',
  };
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const btnstyle = { margin: '8px 0' };
  const [error, setError] = useState('');
  const signIn = useSignIn();
  const [checked, setChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const googleHandler = () => {
    console.log('googleHandler');
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async () => {
    console.log(formData);
    // Validazione dei dati di input
    if (!formData.email || !formData.password) {
      alert("Inserisci l'email e la password.");
      return;
    }
    // Invia i dati del form al server
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 422 || response.status === 401) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }
    const token = data.token;
    localStorage.setItem('token', token);
  };
  const onClickHandler = async () => {
    setIsSubmitting(!isSubmitting);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: { email: formData.email, id: response.data.id },
      });
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message || 'Unknown error occurred.');
      } else if (err && err instanceof Error) {
        setError(err.message || 'Unknown error occurred.');
      }
      console.log('Error: ', err);
    }
  };

  return (
    <Fragment>
      <Grid style={style}>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <Logo />
            </Avatar>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Button
                  disableElevation
                  fullWidth
                  onClick={googleHandler}
                  size="large"
                  variant="outlined"
                  sx={{
                    color: 'grey.700',
                    backgroundColor: theme.palette.grey[50],
                    borderColor: theme.palette.grey[100],
                  }}
                >
                  <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                    <img
                      src={Google}
                      alt="google"
                      width={16}
                      height={16}
                      style={{ marginRight: matchDownSM ? 8 : 16 }}
                    />
                  </Box>
                  Sign in with Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                  <Button>OR</Button>
                  <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                </Box>
              </Grid>
            </Grid>
            <Typography color={colors.primary[300]} gutterBottom>
              Sign in with Email address
            </Typography>
          </Grid>
          <FormControl style={formStyle}>
            <InputLabel>Email Address / Username</InputLabel>
            <OutlinedInput
              id="email"
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              label="Email Address / Username"
              inputProps={{}}
            />
          </FormControl>

          <FormControl style={formStyle}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              name="password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{}}
            />
          </FormControl>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            ><Link to='/reset-password'>Forgot Password?
              </Link>
            </Typography>
          </Stack>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ marginTop: 16 , marginBottom: 16}}
            onClick={handleSubmit}
            disableElevation
            disabled={isSubmitting}
            size="large"
            color={theme.palette.main}
          >
            Login
          </Button>
          <Grid item xs={12}>
            <Grid item container direction="column" alignItems="center" xs={12}>
              <Typography
                to="/Register"
                variant="subtitle1"
                sx={{ textDecoration: 'none' }}
              >
                <Link to='/register'>
                Don&apos;t have an account?{' '}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default LoginForm;
