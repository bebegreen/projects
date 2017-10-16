import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
        {<Marker position={{ lat: props.lat, lng: props.lng }} />}
    </GoogleMap>
))

export default class Map extends Component {

    render() {
        const { lat, lng } = this.props.location;
        return (
            <MyMapComponent
                lat = {lat}
                lng = {lng}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoXkSSqgDV07tBv42eBsKpoRBm4rJmMhQ&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}
