import React, { useState, Fragment, useEffect } from 'react';
import {
  InputLabel,
  OutlinedInput,
  FormControl,
  Button,
  Grid,
  Box,
  Paper,
  Typography,
  useTheme,
  TextField,
  IconButton,
  InputAdornment,
  Icon,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import backgroundImage1 from '../../images/weshare-left.7317ad1f.png';
import backgroundImage2 from '../../images/weshare-right.16b9c9bb.png';
import resetImg from '../../images/password-reset.png';
import passwordImg from '../../images/newPassword.png';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SnackbarComponent from '../../component/toastBar/SnackBarComponent';
import successfulImg from '../../images/successful.png';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.module.css';
const ForgotPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(1);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [msgToastBar, setMsgToastBar] = useState('');
  const [type, setType] = useState('');
  const colors = tokens(theme.palette.mode);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(true);

  const handleVerificationCode = () => {
    const firstNumber = document.getElementsByName('firstNumber')[0].value;
    const secondNumber = document.getElementsByName('secondNumber')[0].value;
    const thirdNumber = document.getElementsByName('thirdNumber')[0].value;
    const fourthNumber = document.getElementsByName('fourthNumber')[0].value;
    const fifthNumber = document.getElementsByName('fifthNumber')[0].value;
    const sixthNumber = document.getElementsByName('sixthNumber')[0].value;
    const code = firstNumber + secondNumber + thirdNumber + fourthNumber + fifthNumber + sixthNumber;
    return code;
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
    marginBottom: '10px',
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
  const inputStyle = {
    width: '40px',
    border: isCodeValid ? '1px solid black' : '1px solid red',
    borderRadius: '5px',
  };

  const handleNextPhase = () => {
    setPhase(phase + 1);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const [email, setEmail] = useState();
  const isEmailValid = isValidEmail(email);
  const handleChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const onClickHandlerVerifcationMail = async () => {
    console.log(JSON.stringify({ email: email }));
    const response = await fetch(
      'http://localhost:8080/api/users/login/forgot',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: email }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      const jsonString = JSON.stringify(data);
      console.log(jsonString);
      localStorage.setItem('apiData', jsonString);
      handleNextPhase();
      setOpen(true);
      setMsgToastBar('Mail sent with success');
      setType('success');
    }
    else {
      setOpen(true);
      setMsgToastBar('An error has occurred, email address not found');
      setType('error');
    }
  };
  const onClickHandlerVerificationCode = () => {
    const code=handleVerificationCode();
    console.log('verification code');
    console.log(code);
    const storedData = localStorage.getItem('apiData');
    const apiData = JSON.parse(storedData);
    if (code === apiData.OTP) {
      handleNextPhase();
      setOpen(true);
      setMsgToastBar('Verification code correct');
      setType('success');
    } else {
      setOpen(true);
      setMsgToastBar('Please enter a valid verification code');
      setType('error');
      setIsCodeValid(false);
      clearCodeInputs();

    }
  }
  const onClickHandlerResetPassword = async () => {
    console.log('Reset password');
    if (password === confirmPassword) {
      const response = await fetch(
        'http://localhost:8080/api/users/login/reset',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: JSON.parse(localStorage.getItem('apiData')).id,
            password: password
          }),
        }
      );
      if (response.ok) {
        console.log("Password reset with success");
        handleNextPhase();
        setOpen(true);
        setMsgToastBar('Password reset with success');
        setType('success');
        localStorage.removeItem('apiData');
      }
      else {
        setOpen(true);
        setMsgToastBar('An error has occurred, please try again');
        setType('error');
      }
    } else {
      setOpen(true);
      setMsgToastBar('Passwords do not match');
      setType('error');
    }

  }
  const onClickHandlerLogin = () => {
    console.log('Login');
    navigate('/login');
  }
  const clearCodeInputs = () => {
    document.getElementsByName('firstNumber')[0].value = '';
    document.getElementsByName('secondNumber')[0].value = '';
    document.getElementsByName('thirdNumber')[0].value = '';
    document.getElementsByName('fourthNumber')[0].value = '';
    document.getElementsByName('fifthNumber')[0].value = '';
    document.getElementsByName('sixthNumber')[0].value = '';
  };
  const renderPhase = () => {
    switch (phase) {
      case 1:
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
                      to="/login"
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
                  <img src={resetImg} alt="reset" width="100px" />
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 'bold' }}
                    color={colors.primary[500]}
                    gutterBottom
                  >
                    Reset password
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Enter your email to reset the password. We’ll send you a
                    verification code to make sure it’s you.
                  </Typography>
                </Grid>
                <FormControl style={formStyle}>
                  <TextField
                    type="email"
                    value={email}
                    name="email"
                    onChange={handleChange}
                    label="Email Address / Username"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{ marginTop: 16 }}
                    disableElevation
                    size="large"
                    color={theme.palette.main}
                    onClick={onClickHandlerVerifcationMail}
                  >
                    Next
                  </Button>
                </FormControl>
              </Paper>
            </Grid>
          </Fragment>
        );
      case 2:
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
                      to="/login"
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
                  <img src={resetImg} alt="reset" width="100px" />
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 'bold' }}
                    color={colors.primary[500]}
                    gutterBottom
                  >
                    Enter verification code
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    We’ve sent a verification code to {email}.
                    Enter the code to continue.
                  </Typography>
                </Grid>
                <FormControl sx={{ width: '100%', marginTop: 4 }} >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <FormControl>
                      <OutlinedInput
                        name="firstNumber"
                        id="firstNumber"
                        style={inputStyle}
                        inputProps={{
                          maxLength: 1,
                          pattern: '[0-9]*',
                          inputMode: 'numeric',
                          onKeyPress: (event) => {
                            const keyCode = event.which ? event.which : event.keyCode;
                            if (keyCode < 48 || keyCode > 57) {
                              event.preventDefault();
                            }
                          },
                        }}
                        autoFocus
                        onInput={(event) => {
                          setIsCodeValid(true);
                          if (event.target.value.length >= event.target.maxLength) {
                            document.getElementsByName('secondNumber')[0].focus();
                          }
                        }} />
                    </FormControl>
                    <FormControl>
                      <OutlinedInput
                        style={inputStyle}
                        name="secondNumber"
                        id="secondNumber"
                        maxLength={1}
                        inputProps={{
                          maxLength: 1,
                          pattern: '[0-9]*',
                          inputMode: 'numeric',
                          onKeyPress: (event) => {
                            const keyCode = event.which ? event.which : event.keyCode;
                            if (keyCode < 48 || keyCode > 57) {
                              event.preventDefault();
                            }
                          },
                        }}
                        onInput={(event) => {
                          if (event.target.value.length >= event.target.maxLength) {
                            document.getElementsByName('thirdNumber')[0].focus();
                          }
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <OutlinedInput
                        name="thirdNumber"
                        id="thirdNumber"
                        style={inputStyle}
                        inputProps={{
                          maxLength: 1,
                          pattern: '[0-9]*',
                          inputMode: 'numeric',
                          onKeyPress: (event) => {
                            const keyCode = event.which ? event.which : event.keyCode;
                            if (keyCode < 48 || keyCode > 57) {
                              event.preventDefault();
                            }
                          },
                        }}
                        maxLength={1}
                        onInput={(event) => {
                          if (event.target.value.length >= event.target.maxLength) {
                            document.getElementsByName('fourthNumber')[0].focus();
                          }
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <OutlinedInput
                        name="fourthNumber"
                        id="fourthNumber"
                        style={inputStyle}
                        inputProps={{
                          maxLength: 1,
                          pattern: '[0-9]*',
                          inputMode: 'numeric',
                          onKeyPress: (event) => {
                            const keyCode = event.which ? event.which : event.keyCode;
                            if (keyCode < 48 || keyCode > 57) {
                              event.preventDefault();
                            }
                          },
                        }}
                        maxLength={1}
                        onInput={(event) => {
                          if (event.target.value.length >= event.target.maxLength) {
                            document.getElementsByName('fifthNumber')[0].focus();
                          }
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <OutlinedInput
                        name="fifthNumber"
                        id="fifthNumber"
                        style={inputStyle}
                        inputProps={{
                          maxLength: 1,
                          pattern: '[0-9]*',
                          inputMode: 'numeric',
                          onKeyPress: (event) => {
                            const keyCode = event.which ? event.which : event.keyCode;
                            if (keyCode < 48 || keyCode > 57) {
                              event.preventDefault();
                            }
                          },
                        }}
                        maxLength={1}
                        onInput={(event) => {
                          if (event.target.value.length >= event.target.maxLength) {
                            document.getElementsByName('sixthNumber')[0].focus();
                          }
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <OutlinedInput
                        name="sixthNumber"
                        id="sixthNumber"
                        style={inputStyle}
                        inputProps={{
                          maxLength: 1,
                          pattern: '[0-9]*',
                          inputMode: 'numeric',
                          onKeyPress: (event) => {
                            const keyCode = event.which ? event.which : event.keyCode;
                            if (keyCode < 48 || keyCode > 57) {
                              event.preventDefault();
                            }
                          },
                        }}
                        maxLength={1}
                      />
                    </FormControl>
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{ marginTop: 20 }}
                    disableElevation
                    size="large"
                    color={theme.palette.main}
                    onClick={onClickHandlerVerificationCode}
                  >
                    Next
                  </Button>
                </FormControl>
              </Paper>
            </Grid>
          </Fragment>
        );
      case 3:
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
                      to="/login"
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
                  <img src={passwordImg} alt="reset" width="100px" />
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 'bold' }}
                    color={colors.primary[500]}
                    gutterBottom
                  >
                    Enter a new password
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    At least 8 characters.
                  </Typography>
                </Grid>
                <FormControl style={{ padding: '0', display: 'flex', marginTop: '20px' }}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChangePassword}
                    name="password"
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
                <FormControl style={{ padding: '0', display: 'flex', marginTop: '20px' }}>
                  <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    name="confirmPassword"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                    inputProps={{}}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{ marginTop: 16 }}
                    disableElevation
                    size="large"
                    color={theme.palette.main}
                    onClick={onClickHandlerResetPassword}
                  >
                    Reset password
                  </Button>
                </FormControl>
              </Paper>
            </Grid>
          </Fragment>
        );
      case 4:
        return (
          <Fragment>
            <SnackbarComponent
              open={open} handleClose={handleClose} autoHideDuration={5000} message={msgToastBar} severity={type} />
            <Grid style={style}>
              <Paper style={paperStyle}>
                <Grid align="center">
                  <img src={successfulImg} alt="reset" width="100px" style={{ marginBottom: '20px' }} />
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 'bold' }}
                    color={colors.primary[500]}
                    gutterBottom
                    style={{ marginBottom: '20px' }}
                  >
                    Good to go!
                  </Typography>
                  <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>
                    Your password has been successfully changed.
                  </Typography>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ marginTop: 16 }}
                  disableElevation
                  size="large"
                  color={theme.palette.main}
                  onClick={onClickHandlerLogin}
                >
                  Go back to login page
                </Button>
              </Paper>
            </Grid>
          </Fragment>
        )
      default:
        return null;
    };
  }
  return (
    <Fragment>
      {renderPhase()}
    </Fragment>
  );
};
export default ForgotPassword;
