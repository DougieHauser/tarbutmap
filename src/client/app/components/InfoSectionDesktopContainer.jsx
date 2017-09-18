import React from 'react';
import InfoSection from './InfoSection.jsx'

var http = require('http');
var CSV = require('csv-string');

class InfoSectionDesktopContainer extends React.Component {
    render() {
        return <div id="info-container-desktop">
                    <InfoSection year={this.props.year}/>
               </div>
    }
}

module.exports = InfoSectionDesktopContainer;
