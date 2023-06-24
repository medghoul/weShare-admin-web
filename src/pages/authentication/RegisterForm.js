import React, { useState } from 'react';
import './RegisterForm.module.css'
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Avatar,
  useTheme,
  FormControlLabel,
  FormControl,
  Checkbox,
  Stack,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  Box,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import Logo from '../../cards/Logo';
import backgroundImage1 from '../../images/weshare-left.7317ad1f.png';
import backgroundImage2 from '../../images/weshare-right.16b9c9bb.png';
import { tokens } from '../../theme';
import SnackbarComponent from '../../component/toastBar/SnackBarComponent';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [displayNotify, setDisplayNotify] = useState(false)
  const [msgToastBar, setMsgToastBar] = useState('');
  const [type, setType] = useState('');


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const paperStyle = {
    padding: 33,
    height: 'auto',
    width: 420,
    margin: '140px auto',
    borderRadius: 10,
  };
  const formStyle = {
    margin: `auto`,
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    display: 'block ruby',
    flexFlow: 'row wrap',
    width: 'calc(100% + 0px)',
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
  const [checked, setChecked] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  async function onClickHandler() {
    setIsSubmitting(!isSubmitting);
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setOpen(true);
        setDisplayNotify(true);
        setMsgToastBar('User created with success');
        setType('success');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setDisplayNotify(true);
        setMsgToastBar('Error');
        setType('error');
      }
    } catch (error) {
      console.log(error.message)
      setOpen(true);
      setDisplayNotify(true);
      if (error.message === 'Failed to fetch') {
        setMsgToastBar('An error has occurred, please try again later');
      } else {
        setMsgToastBar(error.message);
      }
      setType('error');
    }
  }


  return (
    <>
      <SnackbarComponent
        open={open} handleClose={handleClose} message={msgToastBar} severity={type} />
      <Grid style={style}>
        <Grid align="center">
          <Paper style={paperStyle}>
            <Avatar style={avatarStyle}>
              <Logo />
            </Avatar>
            <Typography variant="h2" align="center">
              Register
            </Typography>
            <FormControl style={formStyle}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                margin="normal"
              />
            </FormControl>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth >
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
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            <Stack direction="row" alignItems="center">
              <FormControlLabel
                style={{ marginRight: 0 }}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Agree with "
              />
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                Terms & Condition.
              </Typography>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 16, marginBottom: 16 }}
              onClick={onClickHandler}
              disableElevation
              disabled={isSubmitting}
            >
              Register
            </Button>
            <Grid item xs={12}>
              <Grid item container direction="column" alignItems="center" xs={12}>
                <Typography
                  to="/login"
                  variant="subtitle1"
                  sx={{ textDecoration: 'none' }}
                ><Link to='/login'>
                    Already have an account?
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterForm;
