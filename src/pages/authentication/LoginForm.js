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
  Icon,
  useMediaQuery,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
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
import SnackbarComponent from '../../component/toastBar/SnackBarComponent';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [msgToastBar, setMsgToastBar] = useState('');
  const [type, setType] = useState('');
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
  const signIn = useSignIn();
  const [checked, setChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
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
    if (!formData.email || !formData.password) {
      alert("Inserisci l'email e la password.");
      return;
    }
    try {
      const response = await fetch('http://localhost:8181/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setOpen(true);
        setMsgToastBar('Welcome Back');
        setType('success');
        const { id, token } = data;
        const userData = { id, token };
        localStorage.setItem('userData', JSON.stringify(userData));
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.log(error.message)
      setOpen(true);
      setMsgToastBar('An error has occurred, please verify your credentials');
      setType('error');
      setFormData({
        email: formData.email,
        password: '',
      });
    }
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <Fragment>
      <SnackbarComponent
        open={open} handleClose={handleClose} autoHideDuration={5000} message={msgToastBar} severity={type} />
      <Grid style={style}>
        <Paper style={paperStyle}>
          <Typography
            variant="body1"
            sx={{ display: 'flex' }}
          >
            <Icon color={colors.primary[500]} sx={{ marginRight: '0px' }}>
              <KeyboardBackspaceIcon style={{ marginBottom: '0px' }} />
            </Icon>
            <span
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                Back
              </Link>
            </span>
          </Typography>
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
            style={{ marginTop: 16, marginBottom: 16 }}
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
