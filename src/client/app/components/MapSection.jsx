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
        this.state = {
            year: this.props.year,
            zoom: defaultProps.zoom
        }
    }

    onChange(mapObj, b, c) {
        this.setState({zoom: mapObj.zoom});
    }

    calculateMaxBudgetEntry() {

    }

    render () {
        var sumOfYearlyCityBudgetByYearHasData = this.props.sumOfYearlyCityBudgetByYear != undefined && Object.keys(this.props.sumOfYearlyCityBudgetByYear).length > 0;

        // GOOGLE_MAPS_KEY should be an ENV_VAR!
        var API_KEY = process.env.GOOGLE_MAPS_KEY ? {key: process.env.GOOGLE_MAPS_KEY} : {}
        var maxBudgetEntry = this.calculateMaxBudgetEntry.bind(this);

        var keysForMap = [];
        for(var p in this.props.sumOfYearlyCityBudgetByYear[this.props.year]) {
            keysForMap.push(p);
        }

        return <div id="map-section" className="section-container">
                    <GoogleMapReact
                            bootstrapURLKeys = {API_KEY}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                            style={{position: 'relative', height: '100%'}}
                            onChange={this.onChange.bind(this)}
                          >

                          { !sumOfYearlyCityBudgetByYearHasData ? "" : keysForMap.map((key) => {
                            return <MapSectionBudgetEntry key={key}
                                                   lat={this.props.sumOfYearlyCityBudgetByYear[this.props.year][key].lat}
                                                   lng={this.props.sumOfYearlyCityBudgetByYear[this.props.year][key].lng}
                                                   zoom={this.state.zoom}
                              />
                            })
                          }

                          </GoogleMapReact>
               </div>
    }
}

module.exports = MapSection;
