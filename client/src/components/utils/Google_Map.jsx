import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

export default class Google_Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      showInfo: false
    };
  }

  renderInfo(props) {
    const contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h6 id="firstHeading" class="firstHeading">Directions:</h6>' +
      '<div id="bodyContent">' +
      '<p><a href="https://www.google.com/maps/dir/Current+Location/' + props.lat + ',' + props.lon + '" target="_blank">' +
      'Open in Google Maps</a> ' +
      '</p>' +
      '</div>' +
      '</div>';

    if (this.state.showInfo) {
      return (
        <InfoWindow
          title="Info Window"
          content={ contentString }
          onCloseclick={ () => {
                           this.setState({
                             showInfo: !this.state.showInfo
                           });
                         } } />
        );
    }
    return null;
  }

  render() {
    const props = this.props;

    return (
      <GoogleMapLoader
        containerElement={ <div style={ { height: '450px' } } /> }
        googleMapElement={ <GoogleMap
                             defaultZoom={ 15 }
                             defaultCenter={ { lat: props.lat, lng: props.lon } }>
                             <Marker
                               position={ { lat: props.lat, lng: props.lon } }
                               onClick={ () => {
                                           this.setState({
                                             showInfo: !this.state.showInfo
                                           });
                                         } }>
                               { this.renderInfo(props) }
                             </Marker>
                           </GoogleMap> } />
      );
  }
}
