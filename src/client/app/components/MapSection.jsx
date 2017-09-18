import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapSectionBudgetEntry from './MapSectionBudgetEntry.jsx';

var defaultProps = {
    center: {lat: 31.50, lng: 35.00},
    zoom: 7
};

var API_KEY = process.env.GOOGLE_MAPS_KEY;  // will work locally, but will need env_var in heroku
consoel.log("API_KEY: " + API_KEY);
var bootstrap = API_KEY ? {key: API_KEY } : {}

class MapSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {year: this.props.year}
    }

    render () {
        return <div id="map-section" className="section-container">
                    <GoogleMapReact
                            bootstrapURLKeys={bootstrap}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            style={{position: 'relative', height: '100%'}}
                          >

                            {/* EXAMPLE! */}
                            <MapSectionBudgetEntry lat={31.50} lng={35.00}/>

                          </GoogleMapReact>
               </div>
    }
}

module.exports = MapSection;
