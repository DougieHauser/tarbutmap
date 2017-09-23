import React from 'react';

const AnyReactComponent = ({ text }) => <div style={{border: '5px solid #f44336', backgroundColor: 'white', fontSize: '16', padding: '4', borderRadius: '5000px'}}>{text}</div>;

class MapSectionBudgetEntry extends React.Component {
    render () {
            return <div className='budget-map-entry' style={{backgroundColor: 'red', width: (10 * (this.props.zoom ^ 3)) + "px", height: (10 * (this.props.zoom ^ 3)) + "px"}}></div>
        }
}

module.exports = MapSectionBudgetEntry;