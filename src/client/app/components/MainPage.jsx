import React from 'react';
import TopHeadlineBar from './TopHeadlineBar.jsx'
import InfoAndMapSection from './InfoAndMapSection.jsx'

import BLA from '../common/BudgetInfo.jsx';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {year: '2016'}
  }

  componentDidMount() {
    console.log("MOUNTED");
  }

  updateYear(value) {
    this.setState({year: value});
  }

  render () {
    return <div id='main-container'>
                <TopHeadlineBar startingYear={this.state.year} updateYearInMainPage={this.updateYear.bind(this)}/>

                <InfoAndMapSection year={this.state.year}/>
            </div>;
  }
}

module.exports = MainPage;