import React from 'react';
import TopHeadlineBar from './TopHeadlineBar.jsx'
import InfoAndMapSection from './InfoAndMapSection.jsx'

import BudgetInfo from '../common/BudgetInfo.jsx';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        year: '2016',
        budgetDataByYearAndCity: {},
        sumOfYearlyCityBudgetByYear: {},
        summedBudgetByYear: {},
        tarbutInfoInitialized: false,
    };
  }

  componentDidMount() {
      if(!this.state.tarbutInfoInitialized) {
          // check if data arrived from BudgetInfo component
          if(Object.keys(BudgetInfo.budgetDataByYearAndCity).length == 0) {
              setTimeout(this.componentDidMount.bind(this), 1000);
          } else {
              this.setState({
                  tarbutInfoInitialized: true,
                  budgetDataByYearAndCity: BudgetInfo.budgetDataByYearAndCity,
                  sumOfYearlyCityBudgetByYear: BudgetInfo.sumOfYearlyCityBudgetByYear,
                  summedBudgetByYear: BudgetInfo.summedBudgetByYear
              });
          }
      }
  }

  updateYear(value) {
    this.setState({year: value});
  }

  render () {
    return <div id='main-container'>
                <TopHeadlineBar startingYear={this.state.year} updateYearInMainPage={this.updateYear.bind(this)}/>

                <InfoAndMapSection year={this.state.year}
                                  budgetDataByYearAndCity={this.state.budgetDataByYearAndCity}
                                  sumOfYearlyCityBudgetByYear={this.state.sumOfYearlyCityBudgetByYear}
                                  summedBudgetByYear={this.state.summedBudgetByYear}
                />
            </div>;
  }
}

module.exports = MainPage;