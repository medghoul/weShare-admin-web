import {React,useState} from 'react';
import { Box, Typography, Link, Select, MenuItem } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import itFlag from '../flags/flag-it.png';
import enFlag from '../flags/flag-uk.png';
import esFlag from '../flags/flag-es.png';
import frFlag from '../flags/flag-fr.png';
import deFlag from '../flags/flag-de.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const languages = [
    { code: 'it', label: 'Italien', icon: itFlag },
    { code: 'en', label: 'English', icon: enFlag },
    { code: 'es', label: 'Español', icon: esFlag },
    { code: 'fr', label: 'Français', icon: frFlag },
    { code: 'de', label: 'Deutsch', icon: deFlag },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        py: 4,
        px: 2,
        textAlign: 'center',
        position: 'fixed',
        left: 0,
        bottom: 0,
        height: 190,
        width: '100%',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        pl={2}
      >
      <Select
  value={selectedLanguage}
  onChange={handleLanguageChange}
  sx={{ width: 200 }}
  renderValue={(selected) => (
    <Box display="flex" alignItems="center">
    <img
      src={languages.find((language) => language.code === selected)?.icon}
      alt="Language Flag"
      style={{ width: 24, height: 24, marginRight: 8 }}
    />
    <Typography variant="body2">{languages.find((language) => language.code === selected)?.label}</Typography>
  </Box>
  )}
>
  {languages.map((language) => (
    <MenuItem key={language.code} value={language.code}>
      <img
        src={language.icon}
        alt="Language Flag"
        style={{ width: 24, height: 24, marginRight: 8 }}
      />
      {language.label}
    </MenuItem>
  ))}
</Select>
        <Box>
          <Link href="https://www.instagram.com">
            <InstagramIcon sx={{ fontSize: 43, ml: 2 }} />
          </Link>
          <Link href="https://www.youtube.com">
            <YouTubeIcon sx={{ fontSize: 43, ml: 2 }} />
          </Link>
          <Link href="https://www.facebook.com">
            <FacebookIcon sx={{ fontSize: 43, ml: 2 }} />
          </Link>
          <Link href="https://www.twitter.com">
            <TwitterIcon sx={{ fontSize: 43, ml: 2 }} />
          </Link>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} We Share. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Created by <Link href="https://github.com/medghoul">MedOx</Link>
      </Typography>
      <Box mt={2}>
        <Link href="/trasparenza">Trasparenza delle piattaforme</Link> |{' '}
        <Link href="/terms-and-conditions">Termini e Condizioni</Link> |{' '}
        <Link href="/impostazioni-cookie">Impostazioni cookie</Link>
      </Box>
    </Box>
  );
};

export default Footer;