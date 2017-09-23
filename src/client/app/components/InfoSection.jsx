import React from 'react';
import Consts from '../common/Consts.jsx';
import InfoSectionDetailView from './InfoSectionDetailView.jsx';


class InfoSection extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                budgetTypeToShow: Consts.ALLOCATED
            };
    }

    budgetTabClicked(btn_id, that, event, proxy) {
        let allocated_id = 'btn_' + Consts.ALLOCATED;
        let allocated_btn = document.getElementById(allocated_id);
        allocated_btn.className = allocated_btn.className.replace(" active", "");

        let approved_id = 'btn_' + Consts.APPROVED;
        let approved_btn = document.getElementById(approved_id);
        approved_btn.className = approved_btn.className.replace(" active", "");

        that.setState({budgetTypeToShow: btn_id});

        if(btn_id == Consts.ALLOCATED) {
            allocated_btn.className = (allocated_btn.className += " active");
        } else if(btn_id == Consts.APPROVED) {
            approved_btn.className = (approved_btn.className += " active");
        }
    }

    render() {
        var that = this;
        return <div id="info-container" className="section-container">
                   <div className="budget-type-tab">
                     <button id={'btn_' + Consts.APPROVED} className="budget-tab-link" onClick={this.budgetTabClicked.bind(event, Consts.APPROVED, that)}>סכום שאושר</button>
                     <button id={'btn_' + Consts.ALLOCATED} className="budget-tab-link active" onClick={this.budgetTabClicked.bind(event, Consts.ALLOCATED, that)}>סכום שהועבר</button>
                   </div>

                   { Object.keys(this.props.budgetDataByYearAndCity).length == 0 ?
                            <div className="heb_in_middle" style={{fontSize: "2rem", padding: "5rem"}}>טוען נתונים...</div> :
                                <InfoSectionDetailView year={this.props.year}
                                                        budgetTypeToShow={this.state.budgetTypeToShow}
                                                        budgetDataByYearAndCity={this.props.budgetDataByYearAndCity}
                                                        sumOfYearlyCityBudgetByYear={this.props.sumOfYearlyCityBudgetByYear}
                                                        summedBudgetByYear={this.props.summedBudgetByYear}
                                />
                     }
               </div>
    }
}

module.exports = InfoSection;
