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
            zoom: defaultProps.zoom
        }
    }

    onChange(mapObj, b, c) {
        {var hasChanged = this.state.zoom != mapObj.zoom}
        if(hasChanged) {
            this.setState({zoom: mapObj.zoom});
        }
    }

    calculateMaxBudgetEntryAmount(sumOfYearlyCityBudgetByYearHasData) {
        var largestAmountSoFar = 0;
        if(sumOfYearlyCityBudgetByYearHasData) {
            Object.keys(this.props.sumOfYearlyCityBudgetByYear[this.props.year]).forEach((p) => {
                let currAmount = this.props.sumOfYearlyCityBudgetByYear[this.props.year][p][this.props.budgetTypeToShow];
                if (currAmount > largestAmountSoFar) {
                    largestAmountSoFar = currAmount;
                }
            });
        }

        return largestAmountSoFar;
    }

    turnCityNameToNumber(cityName) {
        if(cityName.length < 6) {
            return cityName.substring(1,2).charCodeAt();
        }
        return cityName.substring(5,6).charCodeAt();
    }

    render () {
        var sumOfYearlyCityBudgetByYearHasData = this.props.sumOfYearlyCityBudgetByYear != undefined && Object.keys(this.props.sumOfYearlyCityBudgetByYear).length > 0;

        // GOOGLE_MAPS_KEY should be an ENV_VAR!
        var API_KEY = process.env.GOOGLE_MAPS_KEY ? {key: process.env.GOOGLE_MAPS_KEY} : {}
        var maxBudgetEntry = this.calculateMaxBudgetEntryAmount(sumOfYearlyCityBudgetByYearHasData);

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
                                                   relativeBudget={this.props.sumOfYearlyCityBudgetByYear[this.props.year][key][this.props.budgetTypeToShow] / maxBudgetEntry}
                                                   semiRandNumber={this.turnCityNameToNumber(key)}
                              />
                            })
                          }

                          </GoogleMapReact>
               </div>
    }
}

module.exports = MapSection;
