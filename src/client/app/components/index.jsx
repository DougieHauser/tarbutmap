import React from 'react';
import {render} from 'react-dom';
import MainPage from './MainPage.jsx'

require("../../public/style.css");

class App extends React.Component {
  render () {
    return <MainPage/>;
  }
}

render(<App/>, document.getElementById('app'));