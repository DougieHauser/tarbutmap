import React from 'react';
import Consts from '../common/Consts.jsx';
import Utils from '../common/Utils.jsx';

class InfoSectionDetailView extends React.Component {

    render() {
        {var budgetDetails = this.props.sumOfYearlyCityBudgetByYear[this.props.year]}

        return <div id="info-details-view-root-container">
                    <div className="info-yearly-sum-lbl">
                        <div className="heb_in_middle" style={{paddingTop: '5%', fontWeight: 'bold'}}>סכום לשנת {this.props.year}:</div>
                        <div>{this.props.summedBudgetByYear[this.props.year] &&  '₪ ' + Utils.numberWithCommas(this.props.summedBudgetByYear[this.props.year][this.props.budgetTypeToShow]) }</div>
                    </div>

                    <div id="info-details-container">
                        <div className="heb_in_middle" style={{textDecoration: 'underline', marginBottom: '2%'}}>פירוט:</div>

                        <div id="detail-cities-budgets-container">
                            {Object.keys(budgetDetails).sort().map((key, index) => {
                                                        return <div key={key} className="detail-city-budget-div">
                                                                    <div className="detail-city-div">&nbsp;&nbsp;&nbsp;{key}:</div>
                                                                    <div className="detail-budget-div">{Utils.numberWithCommas(budgetDetails[key][this.props.budgetTypeToShow]) + ' ₪'}</div>
                                                                </div>
                            })}
                        </div>
                    </div>
                </div>
    }
}

module.exports = InfoSectionDetailView;
