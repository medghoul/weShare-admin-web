import React, { useRef, useState } from 'react';
import {
  Box,
  Input,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@mui/material';
import { Person as PersonIcon, Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { Autocomplete, LoadScript } from '@react-google-maps/api';


const SearchBox = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const autocompleteStartPointRef = useRef(null);
  const autocompleteEndPointRef = useRef(null);

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleDecreasePassengers = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const handleIncreasePassengers = () => {
    if (passengers < 3) {
      setPassengers(passengers + 1);
    }
  };

  const handleSearch = () => {
    if (startPoint === '' || endPoint === '' || travelDate === '') {
      alert('Compila tutti i campi');
    } else {
      alert('Ricerca effettuata');
    }
  };

  const handleStartPointChanged = () => {
    const place = autocompleteStartPointRef.current.getPlace();
    if (place) {
      setStartPoint(place.formatted_address);
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };
  const handleEndPointChanged = () => {
    const place = autocompleteEndPointRef.current.getPlace();
    if (place) {
      setEndPoint(place.formatted_address);
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyCGOAl7gNwO6Y5GWtYpCVWRFhnR4KngtAE'
      libraries={['places']}
    >
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '16px',
          width: '80%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          marginBottom: '40px',
        }}
      >
        <Autocomplete
          onLoad={(ref) => (autocompleteStartPointRef.current = ref)}
          onPlaceChanged={handleStartPointChanged}
        >
          <Input
            placeholder="Partenza"
            fullWidth
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
          />
        </Autocomplete>
        <Autocomplete
          onLoad={(ref) => (autocompleteEndPointRef.current = ref)}
          onPlaceChanged={handleEndPointChanged}
        >
          <Input
            placeholder="Destinazione"
            fullWidth
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
          />
        </Autocomplete>
        <Box sx={{ width: '15%' }}>
          <Input
            type="date"
            placeholder="Data di viaggio"
            fullWidth
            onChange={(e) => setTravelDate(e.target.value)}
          />
        </Box>
        <IconButton onClick={handleOpenMenu}>
          <PersonIcon />
          <Typography style={{ marginLeft: '8px' }}>{passengers}</Typography>
        </IconButton>
        <Menu
          open={Boolean(openMenu)}
          anchorEl={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleDecreasePassengers}>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{passengers}</Typography>
              <IconButton onClick={handleIncreasePassengers}>
                <AddIcon />
              </IconButton>
            </Box>
          </MenuItem>
        </Menu>
        <Button variant="contained" color="primary" style={{ borderRadius: '10px' }} onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </LoadScript>
  );
};

export default SearchBox;
