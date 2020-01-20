import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Grid from '@material-ui/core/Grid';

class MapsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }
    render() {
        return (

            <Grid container item sm={12} style={{position: 'relative', height: '70vh'}} >
                <Map className="MapsComponent-Map"
                    google={this.props.google}
                    zoom={14}
                    initialCenter={{ lat: this.props.lat, lng: this.props.lang }}
                >
                    <Marker position={{ lat: this.props.lat, lng: this.props.lang }} />
                </Map>
            </Grid>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAYxKa8MehJ5V8hARdBbyJa_ecZ5pnhJso'
})(MapsComponent);