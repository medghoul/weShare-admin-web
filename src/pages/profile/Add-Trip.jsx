import React, { useState, useEffect, useRef } from 'react';
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
    Avatar,
    useTheme,
    Grid,
    MenuItem,
    TextField,
    Menu,
    IconButton,
} from '@mui/material';
import { Person as PersonIcon, Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import { Autocomplete, GoogleMap } from '@react-google-maps/api';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import Topbar from '../../global/Topbar';
import { styled } from '@mui/system';
import Footer from '../../global/Footer';
import SnackbarComponent from '../../component/toastBar/SnackBarComponent';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
const StyledBox = styled(Box)({
    backgroundColor: '#F7FAFF',
    borderRadius: '8px',
    padding: '16px',
    width: '45%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    marginBottom: '40px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
});
const CustomDateTimePickerInput = styled(TextField)({
    border: 'none',
    '&:hover': {
        border: 'none',
    },
    '&.Mui-focused': {
        border: 'none',
    },
});





const googleMapsApiKey = 'AIzaSyCGOAl7gNwO6Y5GWtYpCVWRFhnR4KngtAE'
const AddTrip = (props) => {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
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
    const [open, setOpen] = useState(false);
    const [msgToastBar, setMsgToastBar] = useState('');
    const [type, setType] = useState('');
    const [startStreetAddress, setStartStreetAddress] = useState('');
    const [endStreetAddress, setEndStreetAddress] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [startAddress, setStartAddress] = useState('');
    const [endAddress, setEndAddress] = useState('');
    const handleOpenMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
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

    const handlePublishRide = async () => {
        const userData = localStorage.getItem('userData');
        const token = JSON.parse(userData).token;
        const userId = JSON.parse(userData).id;
        console.log(startAddress);
        console.log(endAddress);
        if (startPoint === '' || endPoint === '' || travelDate === '') {
            alert('Please fill in all fields');
        } else {
            try {
                const response = await fetch('http://localhost:8181/api/trip/pub-ride', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        addressOfDeparture: startAddress.streetAddress,
                        addressOfArrival: endAddress.streetAddress,
                        cityOfDeparture: startAddress.city,
                        cityOfArrival: endAddress.city,
                        price: 50.00,
                        departureTime: travelDate,
                        seatsAvailable: passengers,
                        driver: {
                            id: userId
                        }
                    }),
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setOpen(true);
                    setMsgToastBar('Ride published successfully');
                    setType('success');
                    setStartPoint('');
                    setEndPoint('');
                    setTravelDate('');
                    setPassengers(1);
                }
            } catch (error) {
                console.log(error);
                setOpen(true);
                setMsgToastBar('An error occurred while publishing the ride. Please try again later.');
                setType('error');
                setStartPoint('');
                setEndPoint('');
                setTravelDate('');
                setPassengers(1);
            }
        };
    };

    const handleStartPointChanged = () => {
        const place = autocompleteStartPointRef.current.getPlace();
        console.log(place);
        if (place) {
            const startAddressParts = place.formatted_address.split(',').map(part => part.trim());
            setStartPoint(place.formatted_address);
            setStartStreetAddress(startAddressParts[0]);
            setStartCity(startAddressParts[1]);
        }
    };
    const handleEndPointChanged = () => {
        const place = autocompleteEndPointRef.current.getPlace();
        console.log(place);
        if (place) {
            const newEndPoint = place.formatted_address;
            if (newEndPoint !== endPoint) {
                const endAddressParts = place.formatted_address.split(',').map(part => part.trim());
                setEndPoint(newEndPoint);
                setEndCity(endAddressParts[1]);
                setEndStreetAddress(endAddressParts[0]);


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
                        const startAddressParts = leg.start_address.split(',').map(part => part.trim());
                        const startCityParts = startAddressParts[2].split(' ');
                        const startZipCode = startCityParts.find(part => /\d/.test(part));
                        const startCity = startCityParts.slice(0, startCityParts.length - 1)
                            .filter(part => !/\d/.test(part))
                            .join(' ');
                        setStartAddress({
                            streetAddress: startAddressParts[0] + ', ' + startAddressParts[1],
                            city: startCity.trim(),
                            zipCode: startZipCode.trim(),
                            country: startAddressParts[3]
                        });
                        console.log(startAddress);
                        const endAddressParts = leg.end_address.split(',').map(part => part.trim());
                        const endCityParts = endAddressParts[2].split(' ');
                        const endZipCode = endCityParts.find(part => /\d/.test(part));
                        const endCity = endCityParts.slice(0, endCityParts.length - 1)
                            .filter(part => !/\d/.test(part))
                            .join(' ');
                        setEndAddress({
                            streetAddress: endAddressParts[0] + ', ' + endAddressParts[1],
                            city: endCity.trim(),
                            zipCode: endZipCode.trim(),
                            country: endAddressParts[3]
                        });
                        console.log(endAddress);
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
            <SnackbarComponent
                open={open} handleClose={handleClose} autoHideDuration={5000} message={msgToastBar} severity={type} />
            <Topbar></Topbar>
            <Box sx={{
                backgroundColor: '#F7FAFF', borderRadius: '8px',
                padding: '16px',
                width: '80%',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'flex-start',
                position: 'relative',
                marginBottom: '40px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }
            } >
                <Grid item sx={{ marginRight: '10px' }}>
                    <Avatar
                        alt="profile-image"
                        variant="rounded"
                        size="xl"
                        shadow="sm"
                    />
                </Grid>
                <Box height="100%" mt={0.5} lineHeight={1}>
                    <Typography variant="h5" fontWeight="medium">
                        User Name
                    </Typography>
                    <Typography variant="button" color="text" fontWeight="medium">
                        CEO / Co-Founder
                    </Typography>
                </Box>
            </Box >
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
                <LocalizationProvider variant="outlined" dateAdapter={AdapterDayjs}>
                    <DemoContainer variant="outlined" components={['DateTimePicker']}>
                        <DateTimePicker value={travelDate} onChange={setTravelDate} label="Basic date time picker" />
                    </DemoContainer>
                </LocalizationProvider>

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
                <Button variant="contained" color="primary" style={{ borderRadius: '10px' }} onClick={handlePublishRide}>
                    Publish a ride
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
                <DialogTitle>Path details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Starting point: {startCity}
                        <br />
                        End point: {endCity}
                        <br />
                        Distance: {distance}
                        <br />
                        Duration: {duration}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary" autoFocus>
                        confirmation
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}


export default GoogleApiWrapper({
    apiKey: googleMapsApiKey,
    libraries: ['places']
})(AddTrip);