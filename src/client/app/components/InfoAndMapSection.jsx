import React from 'react';
import PresidingMinisterSection from './PresidingMinisterSection.jsx';
import InfoSectionDesktopContainer from './InfoSectionDesktopContainer.jsx';
import MapSection from './MapSection.jsx';

class InfoAndMapSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {year: this.props.year};
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.year !== this.state.year) {
            this.setState({ year: nextProps.year });
        }
    }


    render () {
        return <div id="info-and-map-section">
                    <div id="presiding-minister-and-info-container">
                        <PresidingMinisterSection year={this.state.year}/>
                        <InfoSectionDesktopContainer year={this.state.year}
                                                     budgetDataByYearAndCity={this.props.budgetDataByYearAndCity}
                                                     sumOfYearlyCityBudgetByYear={this.props.sumOfYearlyCityBudgetByYear}
                                                     summedBudgetByYear={this.props.summedBudgetByYear}

                                                     funcChangeBudgetType={this.props.funcChangeBudgetType}
                                                     budgetTypeToShow={this.props.budgetTypeToShow}
                        />
                    </div>

                    <MapSection year={this.state.year}
                                budgetDataByYearAndCity={this.props.budgetDataByYearAndCity}
                                sumOfYearlyCityBudgetByYear={this.props.sumOfYearlyCityBudgetByYear}
                                summedBudgetByYear={this.props.summedBudgetByYear}

                                budgetTypeToShow={this.props.budgetTypeToShow}
                    />
               </div>
    }
}

module.exports = InfoAndMapSection;