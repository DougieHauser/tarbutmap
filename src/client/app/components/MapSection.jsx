import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapSectionBudgetEntry from './MapSectionBudgetEntry.jsx';

var defaultProps = {
    center: {lat: 31.50, lng: 35.00},
    zoom: 7
};

class MapSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {year: this.props.year}
    }

    render () {
        console.log('gggg2g');
        //console.log(process.env);
        console.log(process.env.GOOGLE_MAPS_KEY);

        return <div id="map-section" className="section-container">
                    <GoogleMapReact

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
