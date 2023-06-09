import { useState } from 'react';
import { Box, IconButton, useTheme, Menu, MenuItem } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LightLogo from '../images/ad80bfbf3ecc448a9500048cae28af46.png';
import DarkLogo from '../images/ad80bfbf3ecc448a9500048cae28af46 (1).png';
import { Avatar, Chip } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import TranslateIcon from '@mui/icons-material/Translate';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';
import {
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { red } from '@mui/material/colors';

const Topbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Aggiunto lo stato per l'ancora del menu

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
    setAnchorEl(event.currentTarget); // Imposta l'ancora del menu quando il chip viene cliccato
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Chiudi il menu
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
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

      {/* ICONS */}

      <Box display="flex">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <TranslateIcon/>
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleChipClick}>
          <Chip
            sx={{
              height: '42px',
              alignItems: 'center',
              borderRadius: '27px',
              transition: 'all .2s ease-in-out',
              borderColor: theme.palette.primary.light,
              backgroundColor: theme.palette.primary.light,
              '&[aria-controls="menu-list-grow"], &:hover': {
                borderColor: theme.palette.primary.main,
                background: `${theme.palette.primary.main}!important`,
                color: theme.palette.primary.light,
                '& svg': {
                  stroke: theme.palette.primary.light,
                },
              },
              '& .MuiChip-label': {
                lineHeight: 0,
              },
            }}
            icon={
              <Avatar {...stringAvatar('Tim Neutkens')}
                sx={{
                  ...theme.typography.mediumAvatar,
                  bgcolor: deepOrange[500],
                  margin: '8px 0px 8px 0px !important',
                  cursor: 'pointer',
                }}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="inherit"
              />
            }
            label={
              <IconSettings
                stroke={1.5}
                size="1.5rem"
              />
            }
            variant="outlined"
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            bgcolor={deepPurple[800]}
          />
        </IconButton>
        <Menu
          id="menu-list-grow"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLoginClick}>
            <LoginIcon  />
            Login
          </MenuItem>
          <MenuItem onClick={handleRegisterClick}>
            <PersonAddIcon />
            Registrati
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;

