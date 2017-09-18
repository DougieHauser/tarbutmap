import React from 'react';
import Consts from '../common/Consts.jsx';

let MINISTER_PIC_PATH_PREFIX = '/pics/minister_pics/';

let MINISTER_PIC1 = "minister-pic1";
let MINISTER_PIC2 = "minister-pic2";

class PresidingMinisterSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentPic: MINISTER_PIC1, year: this.props.year};
    }

    componentDidMount() {
       this.handleYearChange(this.state.year);
   }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        let previousMinister = Consts.yearlyTarbutMinisters[this.state.year]['name'];
        let nextMinister = Consts.yearlyTarbutMinisters[nextProps.year]['name'];
        if (nextMinister != previousMinister) {
            this.handleYearChange(nextProps.year);
        }
    }

    handleYearChange(p_year) {
        let old_pic = null;
        let current_minister_pic = null;
        if(this.state.currentPic == MINISTER_PIC1) {
            current_minister_pic = MINISTER_PIC2;
            old_pic = MINISTER_PIC1;
        } else {
            current_minister_pic = MINISTER_PIC1;
            old_pic = MINISTER_PIC2;
        }

        // make sure minister-pic1 (which has position=absolute) has the same location properties as minister-pic2
        let pic1 = document.getElementById('minister-pic1');
        let pic2BoundingRect = document.getElementById('minister-pic2').getBoundingClientRect();
        pic1.style.top = pic2BoundingRect.top;
        pic1.style.bottom = pic2BoundingRect.bottom;

        // Toggle between images
        let oldPicHandle = document.getElementById(old_pic);
        let currentPicHandle = document.getElementById(current_minister_pic);
        oldPicHandle.style.zIndex = -1;
        oldPicHandle.style.opacity = 0;
        currentPicHandle.style.zIndex= 1;
        currentPicHandle.style.opacity= 1;

        // Setting the values
        currentPicHandle.src = MINISTER_PIC_PATH_PREFIX + Consts.yearlyTarbutMinisters[p_year]['pic'];
        document.getElementById('minister-name-caption').innerHTML = Consts.yearlyTarbutMinisters[p_year]['name_heb'];

        this.setState({currentPic: current_minister_pic, year: p_year});
    }

    render() {
        return <div className="presiding-minister-container section-container">
                   <div id="presiding-minister-title">שר/ה מכהנ/ת</div>
                    <div id="minister-pics">
                        <img id={MINISTER_PIC1} className="minister_pic" style={{'position': 'absolute'}}></img>
                        <img id={MINISTER_PIC2} className="minister_pic"></img>
                    </div>
                   <div id="minister-name-caption" style={{'marginBottom': '3%', 'fontWeight': 'bold', 'fontSize': '1.5rem'}}></div>
               </div>
    }
}

module.exports = PresidingMinisterSection;
