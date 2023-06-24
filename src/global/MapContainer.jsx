import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startPoint: '',
      endPoint: '',
      travelDate: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleMapClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    this.getCityName(lat, lng);
  };

  getCityName = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat, lng };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const cityName = this.extractCityNameFromGeocodeResults(results);
          this.setState({ startPoint: cityName });
        }
      }
    });
  };

  extractCityNameFromGeocodeResults = (results) => {
    let cityName = '';
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < results[i].address_components.length; j++) {
        const types = results[i].address_components[j].types;
        if (types.includes('locality')) {
          cityName = results[i].address_components[j].long_name;
          break;
        }
      }
      if (cityName !== '') {
        break;
      }
    }
    return cityName;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Effettua l'elaborazione dei dati inseriti e visualizza la tabella
  };

  render() {
    const { startPoint, endPoint, travelDate } = this.state;
    const { google } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="startPoint"
            label="Punto di partenza"
            value={startPoint}
            onChange={this.handleInputChange}
          />
          <TextField
            name="endPoint"
            label="Punto di arrivo"
            value={endPoint}
            onChange={this.handleInputChange}
          />
          <TextField
            name="travelDate"
            label="Data del viaggio"
            type="date"
            value={travelDate}
            onChange={this.handleInputChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Visualizza tabella
          </Button>
        </form>

        <Map
          google={google}
          zoom={14}
          style={{ width: '100%', height: '600px' }}
          initialCenter={{ lat: 41.9028, lng: 12.4964 }}
          onClick={this.handleMapClick}
        />

        <TableContainer  component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Punto di partenza</TableCell>
                <TableCell>Punto di arrivo</TableCell>
                <TableCell>Data del viaggio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{startPoint}</TableCell>
                <TableCell>{endPoint}</TableCell>
                <TableCell>{travelDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCGOAl7gNwO6Y5GWtYpCVWRFhnR4KngtAE', // Sostituisci con la tua chiave API di Google Maps
})(MapContainer);
