import { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Paper,
  Avatar,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Popper,
  Stack,
  Switch,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../theme';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LightLogo from '../images/ad80bfbf3ecc448a9500048cae28af46.png';
import DarkLogo from '../images/ad80bfbf3ecc448a9500048cae28af46 (1).png';
import { deepOrange, deepPurple } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slide from '@mui/material/Slide';
import MaterialUISwitch from '../component/switchMode/switchMode';
import SnackbarComponent from '../component/toastBar/SnackBarComponent';
import axios from 'axios';


const Topbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showSlide, setShowSlide] = useState(false)
  const [zIndex, setZIndex] = useState(9999);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [msgToastBar, setMsgToastBar] = useState('');
  const [type, setType] = useState('');
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = userData ? JSON.parse(userData).token : null;
    setIsLoggedIn(!!token)
    if (isLoggedIn) {
      const userId = JSON.parse(userData).id
      fetchUserData(userId);
      console.log(userInfo);
    }
  }, [isLoggedIn])
  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleRegisterClick = () => {
    navigate('/register');
  };
  const handleChipClick = (event) => {
    setAnchorEl(event.currentTarget);
    setShowSlide(!showSlide);

  };
  const handleLogoutClick = () => {
    localStorage.removeItem('userData')
    setIsLoggedIn(false)
    setShowSlide(false)
    return navigate('/')
  };
  const handleSettingsClick=()=>{
    navigate('/profile')
  }
  const fetchUserData = async (userId) => {
    const userData = localStorage.getItem('userData');
    const token = JSON.parse(userData).token
    try {
      const response = await axios.get(`http://localhost:8181/api/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data)
      setUserInfo(response.data);
      console.log(userInfo)
    } catch (error) {
      setOpen(true);
      setMsgToastBar('An error has occurred, when trying to fetch user data');
      setType('error');
    }
  };
  const handleClickAway = (event) => {
    if (showSlide && anchorEl.contains(event.target)) {
      return;
    }
    setShowSlide(false);
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  const profileMenu = (
    <Paper sx={{
      width: '100%',
      borderRadius: '10px',

    }} elevation={4}>
      {!isLoggedIn && <List
        component="nav"
        sx={{
          borderRadius: '10px',
          backgroundColor: theme.palette.background.paper,
          [theme.breakpoints.down('md')]: {
            minWidth: '100%'
          },
          '& .MuiListItemButton-root': {
            mt: 0.5
          }
        }}
      >
        <ListItemButton
          onClick={handleLoginClick}
          sx={{ borderRadius: `10px`, margin: '10px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LoginIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }} />
            <ListItemText primary={<Typography variant="body2">Log in</Typography>} />
          </div>
        </ListItemButton>
        <ListItemButton
          onClick={handleRegisterClick}
          sx={{ borderRadius: `10px`, margin: '10px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PersonAddIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }} />
            <ListItemText primary={<Typography variant="body2">Register</Typography>} />
          </div>
        </ListItemButton>
      </List>}
      {isLoggedIn && userInfo && <>
        <Box sx={{ p: 2 }}>
          <Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="h4" fontWeight="600">Good Morning,</Typography>
              <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                {userInfo.firstName + ' ' + userInfo.lastName}
              </Typography>
            </Stack>
          </Stack>
          <OutlinedInput
            sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
            id="input-search-profile"
            placeholder="Search profile options"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
              </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{
              'aria-label': 'weight'
            }}
          />
          <Divider />
        </Box>
        <Box sx={{ p: 2 }}>
          <Card
            sx={{
              bgcolor: 'rgb(185 193 217)',
              my: 2
            }}
          >
            <CardContent>
              <Grid container spacing={3} direction="column">
                <Grid item>
                  <Grid item container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1">Start DND Mode</Typography>
                    </Grid>
                    <Grid item>
                      <Switch
                        color="primary"
                        name="sdm"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid item container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1">Allow Notifications</Typography>
                    </Grid>
                    <Grid item>
                      <Switch
                        name="sdm"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Divider />
        <List
          component="nav"
          sx={{
            borderRadius: '10px',
            backgroundColor: theme.palette.background.paper,
            [theme.breakpoints.down('md')]: {
              minWidth: '100%'
            },
            '& .MuiListItemButton-root': {
              mt: 0.5
            }
          }}
        >
          <ListItemButton
            onClick={handleSettingsClick}
            sx={{ borderRadius: `10px`, margin: '10px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SettingsIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }} />
              <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
            </div>
          </ListItemButton>
          <ListItemButton onClick={handleLogoutClick}
            sx={{ borderRadius: `10px`, margin: '10px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LogoutIcon stroke={1.5} size="1.3rem" style={{ marginRight: '10px' }} />
              <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
            </div>
          </ListItemButton>
        </List>
      </>}
    </Paper>
  );



  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          {theme.palette.mode === 'light' ? (
            <img src={LightLogo} />
          ) : (
            <img src={DarkLogo} />
          )}
        </Box>
        <Grid >
          <Box display="flex">
            <IconButton>
              <MaterialUISwitch onClick={colorMode.toggleColorMode} />
            </IconButton>
            <IconButton onClick={handleChipClick}>
              {isLoggedIn && userInfo ? (
                <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                  <Avatar>
                    {userInfo.firstName.charAt(0) + userInfo.lastName.charAt(0)}
                  </Avatar>
                </StyledBadge>) : (<Avatar src="/broken-image.jpg" />)

              }
            </IconButton>
          </Box>
        </Grid>
      </Box>
      <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown" touchEvent="onTouchStart" >
        <Slide sx={{
          position: 'absolute', top: '75px', right: '15px', maxWidth: '365px',
          minWidth: '250px', zIndex: zIndex
        }} direction="up" in={showSlide} mountOnEnter unmountOnExit>
          {profileMenu}
        </Slide>
      </ClickAwayListener>
    </>
  );
};

export default Topbar;

