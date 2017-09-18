import React from 'react';

class TopHeadlineBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startingYear: props.startingYear
        };
    }

  updateYearLabel(value) {
        let selectedYear = document.getElementById('tarbut-year-slider').value;
        this.setState({startingYear: selectedYear});
        this.props.updateYearInMainPage(selectedYear);
  }

    render () {
        return <div id="headline-bar">
                <div className="title-and-subtitle">
                    <div className="title-container">מפת התרבות לשנת</div>
                    <div className="subtitle-container">לחץ כדי לשנות</div>
                </div>
                <div className="year-picker">
                    <label id="tarbut-year-label" htmlFor="tarbut-year">{this.state.startingYear}</label>
                    <input id="tarbut-year-slider" type="range" min="2008" defaultValue={this.state.startingYear} max="2016" step="1"
                                onChange={this.updateYearLabel.bind(this)}/>
                </div>
             </div>;
    }
}

module.exports = TopHeadlineBar;