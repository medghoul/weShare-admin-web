import React, { useState, useRef, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { Container } from '@mui/material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Input,
  Box,
  MenuItem,
  Menu,
  IconButton,
} from '@mui/material';
import { Person as PersonIcon, Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { Autocomplete, GoogleMap } from '@react-google-maps/api';
const googleMapsApiKey = 'AIzaSyCGOAl7gNwO6Y5GWtYpCVWRFhnR4KngtAE'
const MapContainerComponent = (props) => {
  const { google } = props;
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const autocompleteStartPointRef = useRef(null);
  const autocompleteEndPointRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState('');
  const directionsRendererRef = useRef(null);
  const mapRef = useRef(null);
  const endPointMarkerRef = useRef(null);
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
      const newEndPoint = place.formatted_address;
      if (newEndPoint !== endPoint) {
        setEndPoint(newEndPoint);
        console.log(newEndPoint);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
      }
    }
  };

  const isSameLocation = (location1, location2) => {
    if (location1 && location2) {
      return (
        location1.lat === location2.lat &&
        location1.lng === location2.lng
      );
    }
    return false;
  };

  const displayRoute = () => {
    console.log('inside method displayRoute')
    if (startPoint && endPoint) {
      console.log('inside method displayRoute into first if')

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: startPoint,
          destination: endPoint,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            console.log('inside method displayRoute into if status==ok')

            directionsRendererRef.current.setDirections(response);
            const route = response.routes[0];
            const leg = route.legs[0];
            setStartCity(leg.start_address);
            setStartPoint(leg.start_address)
            setEndCity(leg.end_address);
            setEndPoint(leg.end_address)
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
            setDialogOpen(true);
          } else {
            console.log('Directions request failed:', status);
          }
        }
      );
    }
  };
  useEffect(() => {
    if (endPoint) {
      displayRoute();
    }
  }, [endPoint]);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleMapClick = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const { lat, lng } = latLng;

    if (!startPoint) {
      // First click: Set the start point marker
      const newStartPoint = {
        lat: lat(),
        lng: lng(),
      };
      setStartPoint(newStartPoint);
    } else if (!endPoint) {
      // Second click: Remove the previous endpoint marker, set the new endpoint marker, and display the route
      const newEndPoint = {
        lat: lat(),
        lng: lng(),
      };

      // Remove the previous endpoint marker
      if (endPointMarkerRef.current) {
        endPointMarkerRef.current.setMap(null);
      }

      // Set the new endpoint marker
      endPointMarkerRef.current = new props.google.maps.Marker({
        position: newEndPoint,
        map: mapRef.current,
        title: 'End Point',
      });

      setEndPoint(newEndPoint);
    } else {
      // Subsequent clicks: Remove the route, update the endpoint, and display the route
      const newEndPoint = {
        lat: lat(),
        lng: lng(),
      };

      // Remove the previous endpoint marker
      if (endPointMarkerRef.current) {
        endPointMarkerRef.current.setMap(null);
      }

      // Remove the existing route
      directionsRendererRef.current.setDirections({ routes: [] });

      // Set the new endpoint marker
      endPointMarkerRef.current = new props.google.maps.Marker({
        position: newEndPoint,
        map: mapRef.current,
        title: 'End Point',
      });

      setEndPoint(newEndPoint);
    }
  };

  return (
    <>
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
      <Container
        sx={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '16px',
          width: '90%',
          height: '530px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <Container style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Map
            google={props.google}
            zoom={5}
            userInterfaceStyle="dark"
            streetViewControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
            style={{ width: '90%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            initialCenter={{ lat: 41.9028, lng: 12.4964 }}
            onClick={handleMapClick}
            onReady={(mapProps, map) => {
              mapRef.current = map;
              directionsRendererRef.current = new props.google.maps.DirectionsRenderer({ map });
            }}
          >
            {startPoint && <Marker position={startPoint} name="Start Point" />}
            {endPoint && <Marker position={endPoint} name="End Point" />}
          </Map>
        </Container>
      </Container>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Dettagli percorso</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Punto di partenza: {startCity}
            <br />
            Punto di arrivo: {endCity}
            <br />
            Distanza: {distance}
            <br />
            Durata: {duration}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default GoogleApiWrapper({
  apiKey: googleMapsApiKey,
  libraries:['places']
})(MapContainerComponent);