import React, { useState, Fragment } from 'react';
import {
  InputLabel,
  OutlinedInput,
  FormControl,
  Button,
  Grid,
  Paper,
  Typography,
  useTheme,
  Icon,
} from '@mui/material';
import { json } from 'stream';
import backgroundImage1 from '../../images/weshare-left.7317ad1f.png';
import backgroundImage2 from '../../images/weshare-right.16b9c9bb.png';
import resetImg from '../../images/password-reset.png';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const ForgotPassword = () => {
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
  const onClickHandler = async () => {
    console.log(JSON.stringify({ email: email }));
    // Invia i dati del form al server
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
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (response.status === 500) {
      return response;
    }
    if (!response.ok) {
      throw json({ message: 'Could not found the user.' }, { status: 500 });
    }
  };
  return (
    // <Grid container spacing={3} justify="center">
    //   <Grid item xs={12} md={6}>
    //     <Paper style={{ padding: 16 }}>
    //       <Typography variant="h3" align="center">
    //         Find your email
    //       </Typography>
    //       <Typography variant="h5" align="center">
    //         Enter your phone number or recovery email
    //       </Typography>
    //     </Paper>
    //     <div>
    //       <TextField
    //         label="Email"
    //         name="email"
    //         value={email}
    //         onChange={handleChange}
    //         fullWidth
    //         margin="normal"
    //       />
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         color="primary"
    //         fullWidth
    //         style={{ marginTop: 16 }}
    //         onClick={onClickHandler}
    //       >
    //         Next
    //       </Button>
    //     </div>
    //   </Grid>
    // </Grids>
    <Fragment>
      <Grid style={style}>
        <Paper style={paperStyle}>
          <Typography
            variant="body1"
            sx={{ display: 'flex' }}
          >
            <Icon color={colors.primary[500]} sx={{ marginRight: '0px' }}>
              <KeyboardBackspaceIcon />
            </Icon>
            <span
              style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
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
            <InputLabel>Email Address</InputLabel>
            <OutlinedInput
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
              disabled={!isEmailValid}
              onClick={onClickHandler}
            >
              Next
            </Button>
          </FormControl>
        </Paper>
      </Grid>
    </Fragment>
  );
};
export default ForgotPassword;
