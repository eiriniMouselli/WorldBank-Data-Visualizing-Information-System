/* Eftihia Kiafa 3003,
   Grigoria Nikita 3048,
   Eirini Mouselli 3031
*/

import React, { Component } from 'react';
import './index.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Timeline from "./Timeline.js";
import ScatterPlot from "./Scatter Plot.js";
import BarChart from "./BarChart.js";
import logoSeat from './logo.svg';


class App extends Component {
  render() {
    return (
      <HashRouter>
                          
        <div class="animated-title">
          <div class="text-top">
            <div>
              <span>World</span>
              <span>Bank</span>
              <span>Databases</span>
            </div>
          </div>

          <img src={logoSeat} classname="logo" alt="logo1"/> 

          <div class="text-bottom">
            <div>Management</div>
          </div>

          <div class="container">
            <div class="chevron"></div>
            <div class="chevron"></div>
            <div class="chevron"></div>
            <span class="text">Scroll down</span>
          </div>
        </div>

        <div>
          <ul className="header">
            <li><NavLink exact to="/">Timeline</NavLink></li>
            <li><NavLink exact to="/ScatterPlot">Scatter Plot</NavLink></li>
            <li><NavLink exact to="/BarChart">Bar Chart</NavLink></li>
          </ul>

          <div className="content">
            <Route exact  path="/" component={Timeline}/>
            <Route exact path="/ScatterPlot" component={ScatterPlot}/>
            <Route exact path="/BarChart" component={BarChart}/> 
          </div>
          
          <footer>
            <p>Contact us  </p>
            <p>Our Team</p>
            Copyright @2020
          </footer>
        </div>
      
      </HashRouter>
    );
  }
}
export default App;