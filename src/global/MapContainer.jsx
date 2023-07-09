import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Person as PersonIcon, Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: '',
      endPoint: '',
      travelDate: '',
      dialogOpen: false,
      startCity: '',
      endCity: '',
      distance: '',
      duration: '',
    };
    this.directionsRenderer = null;
  }

  displayRoute = () => {
    const { google } = this.props;
    const { startPoint, endPoint } = this.state;
  
    if (startPoint && endPoint) {
      const directionsService = new google.maps.DirectionsService();
  
      directionsService.route(
        {
          origin: startPoint,
          destination: endPoint,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response);
  
            const route = response.routes[0];
            const leg = route.legs[0];
  
            this.setState({
              startCity: leg.start_address,
              endCity: leg.end_address,
              distance: leg.distance.text,
              duration: leg.duration.text,
              dialogOpen: true,
            });
          } else {
            console.log('Directions request failed:', status);
          }
        }
      );
    }
  };
  
  
  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
  
  handleMapClick = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const { lat, lng } = latLng;
    const { startPoint, endPoint } = this.state;
  
    if (!startPoint) {
      // Primo click: Imposta il marker del punto di partenza
      const newStartPoint = {
        lat: lat(),
        lng: lng(),
      };
      this.setState({ startPoint: newStartPoint });
    } else if (!endPoint) {
      // Secondo click: Rimuovi il marker dell'endpoint precedente, imposta il nuovo marker del punto di arrivo e visualizza il percorso
      const newEndPoint = {
        lat: lat(),
        lng: lng(),
      };
  
      // Rimuovi il marker dell'endpoint precedente
      if (this.endPointMarker) {
        this.endPointMarker.setMap(null);
      }
  
      // Imposta il nuovo marker dell'endpoint
      this.endPointMarker = new this.props.google.maps.Marker({
        position: newEndPoint,
        map: this.map,
        title: 'End Point',
      });
  
      this.setState({ endPoint: newEndPoint }, this.displayRoute);
    } else {
      // Click successivi: Rimuovi il percorso e aggiorna il punto di arrivo e il percorso
      const newEndPoint = {
        lat: lat(),
        lng: lng(),
      };
  
      // Rimuovi il marker dell'endpoint precedente
      if (this.endPointMarker) {
        this.endPointMarker.setMap(null);
      }
  
      // Rimuovi il percorso esistente
      this.directionsRenderer.setDirections({ routes: [] });
  
      // Imposta il nuovo marker dell'endpoint
      this.endPointMarker = new this.props.google.maps.Marker({
        position: newEndPoint,
        map: this.map,
        title: 'End Point',
      });
  
      this.setState({ endPoint: newEndPoint }, this.displayRoute);
    }
  };
  
  
  map = null;

  render() {
    const { google } = this.props;
    const { startPoint, endPoint, dialogOpen, startCity, endCity, distance, duration } = this.state;
    let directionsRenderer;




    return (
      <>
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
              google={google}
              zoom={5}
              userInterfaceStyle="dark"
              streetViewControl={false}
              fullscreenControl={false}
              mapTypeControl={false}
              style={{ width: '90%', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              initialCenter={{ lat: 41.9028, lng: 12.4964 }}
              onClick={this.handleMapClick}
              onReady={(mapProps, map) => {
                this.map = map;
                this.directionsRenderer = new google.maps.DirectionsRenderer({ map });
              }}
              
            >
              {startPoint && <Marker
                position={startPoint}
                name="Start Point"
              />}
              {endPoint && (
                <Marker
                  position={endPoint}
                  name="End Point"
                />
              )}

            </Map>
          </Container>
        </Container>
        <Dialog open={dialogOpen} onClose={this.handleDialogClose}>
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
            <Button onClick={this.handleDialogClose} color="primary" autoFocus>
              Chiudi
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCGOAl7gNwO6Y5GWtYpCVWRFhnR4KngtAE',
})(MapContainer);

