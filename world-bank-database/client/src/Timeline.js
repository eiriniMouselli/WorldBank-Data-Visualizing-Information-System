/* Eftihia Kiafa 3003,
   Grigoria Nikita 3048,
   Eirini Mouselli 3031
*/

import React, { Component } from "react";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

var Chart = require("chart.js");

class Timeline extends Component {
  constructor(props){
    super(props);
    this.state = {chosenCountries: [],
                  chosenIndicators: [],
                  timeframe: "0",
                  startingYear: 1960,
                  endingYear: 2019
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event,value){
    this.setState(state => ({
      startingYear: value[0],
      endingYear: value[1]
    }));
  }

  handleSubmit(event){
    var checkedCountries = [];
    var checkedIndicators = [];
    var selectedFrame = "0";
    var complete = true;
    var inputElementsC = document.getElementsByName("countries");
    var inputElementsI = document.getElementsByName("indicators");
    var timeframes = document.getElementsByName("time");
    
    for(var i=0; i<inputElementsC.length; i++){
      if(inputElementsC[i].checked){
        checkedCountries.push(inputElementsC[i].value);
      }
    }
    if(checkedCountries.length === 0){
      alert("Please choose at least one country.");
      complete =false;
    }
    for(var j=0; j<inputElementsI.length; j++){
      if(inputElementsI[j].checked){
        checkedIndicators.push(inputElementsI[j].value);
      }
    }
    if(checkedIndicators.length === 0){
      alert("Please choose at least one indicator.");
      complete =false;
    }
    
    for(var k=0; k<timeframes.length; k++){
      if(timeframes[k].checked){
        selectedFrame = timeframes[k].value
      }
    }
    if(selectedFrame === "0"){
      alert("Please choose a time-frame.");
      complete =false;
    }
    
    if(complete){
      this.setState(state => ({ 
        chosenCountries: this.state.chosenCountries.concat(checkedCountries),
        chosenIndicators: checkedIndicators,
        timeframe: selectedFrame
      }));

      var startY = this.state.startingYear;
      var endY = this.state.endingYear;

      const data = {
        checkedCountries,
        checkedIndicators,
        selectedFrame,
        startY,
        endY
      };
      const options ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch('/D3Timeline', options)
      .then(res => res.json())
      .then(data => {

        var Years=[];
        for(var k=startY; k<=endY; k+= parseInt(this.state.timeframe)) {
          Years.push(k);
        }

        var graphData =[];
        var countryData=[];
        var labels = [];

        for(var k=0; k<data.length; k++){
          if (k>0 && (data[k].c_code != data[k-1].c_code || data[k].i_code != data[k-1].i_code )){
            graphData.push(countryData);
            labels.push(data[k-1].c_code +" - "+ data[k-1].i_code)
            countryData=[];
            countryData.push(parseFloat(data[k].measurement));
          }else{
            countryData.push(parseFloat(data[k].measurement));
          }
        }

        labels.push(data[data.length-1].c_code +" - "+ data[data.length-1].i_code)
        graphData.push(countryData);
        console.log(graphData)

        var ctx = document.getElementById('myChart').getContext('2d');
        if(window.bar != undefined) 
          window.bar.destroy(); 

        window.bar = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Years,
            datasets: []
          },
          options: {
              title: {
                display: true,
                text: "Line Chart"
              },
              scales: {
                  xAxes: [{
                    gridLines: {
                      display: false,
                      color: "grey"
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Years",
                      fontColor: "grey",
                      fontSize: 18
                    }
                  }],
                  yAxes: [{
                    gridLines: {
                      color: "grey",
                      borderDash: [2, 5],
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "Indicators Values",
                      fontColor: "grey",
                      fontSize: 18
                    }
                  }]
              }
          }
        });

        var colors= ["rgb(75,0,130)","rgb(112,128,144)","rgb(153,50,204)","rgb(128,128,128)","rgb(148,0,211)","rgb(255,0,255)","rgb(218,112,214)","rgb(221,160,221)","rgb(15,15,82)"]
      
        for (var i =0; i<graphData.length; i++){
          if (i>colors.length){
            var color = colors[0];
          }
          else{
            var color = colors[i];
          }

          window.bar.data.datasets.push({
            label: labels[i],
            backgroundColor: color,
            borderColor: color,
            fill:false,
            data: graphData[i],
            pointStyle: 'rectRounded'
          });
  
          window.bar.update(); 
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    return (
        <div class="nav">  

          <div>
            <label>Select 1 to 10 countries:</label>
            <label>Select 1 to 10 indicators:</label>
            <label>Select the timeframe:</label>
            <label>Select the specific years:</label>
            <label>Create graph:</label>
          </div>

          <ul class="nav__list">

            <section class="nav__menu">
              <li href="">Countries </li>
              <ul class="nav__menu-lists nav__menu--1-lists">
                <li class="nav__menu-items">Greece <input type="checkbox" name="countries" value="GRC"></input></li>
                <li class="nav__menu-items">Estonia <input type="checkbox" name="countries" value="EST"></input></li>
                <li class="nav__menu-items">Hong Kong <input type="checkbox" name="countries" value="HKG"></input></li>
                <li class="nav__menu-items">Cyprus <input type="checkbox" name="countries" value="CYP"></input></li>
                <li class="nav__menu-items">Brazil <input type="checkbox" name="countries" value="BRA"></input></li>
                <li class="nav__menu-items">Australia <input type="checkbox" name="countries" value="AUS"></input></li>
                <li class="nav__menu-items">Italy <input type="checkbox" name="countries" value="ITA"></input></li>
                <li class="nav__menu-items">France <input type="checkbox" name="countries" value="FRA"></input></li>
                <li class="nav__menu-items">Jamaica <input type="checkbox" name="countries" value="JAM"></input></li>
                <li class="nav__menu-items">Denmark <input type="checkbox" name="countries" value="DNK"></input></li>
              </ul>            
            </section>

            <section class="nav__menu">
              <li href="">Indicators </li>
              <ul class="nav__menu-lists nav__menu--1-lists">
                <li class="nav__menu-items">Population total <input type="checkbox" name="indicators" value="SP.POP.TOTL"></input></li>
                <li class="nav__menu-items">Life expectancy at birth <input type="checkbox" name="indicators" value="SP.DYN.LE00.IN"></input></li>
                <li class="nav__menu-items">GDP growth <input type="checkbox" name="indicators" value="NY.GDP.MKTP.KD.ZG"></input></li>
                <li class="nav__menu-items">GNI per capita <input type="checkbox" name="indicators" value="NY.GNP.PCAP.CD"></input> </li>
                <li class="nav__menu-items">Death rate <input type="checkbox" name="indicators" value="SP.DYN.CDRT.IN"></input></li>
                <li class="nav__menu-items">Birth rate <input type="checkbox" name="indicators" value="SP.DYN.CBRT.IN"></input></li>
                <li class="nav__menu-items">Fertility rate <input type="checkbox" name="indicators" value="SP.DYN.TFRT.IN"></input></li>
                <li class="nav__menu-items">Population ages 0-14 <input type="checkbox" name="indicators" value="SP.POP.0014.TO"></input></li>
                <li class="nav__menu-items">Population ages 15-64 <input type="checkbox" name="indicators" value="SP.POP.1564.TO"></input></li>
                <li class="nav__menu-items">Population ages 65+ <input type="checkbox" name="indicators" value="SP.POP.65UP.TO"></input></li>
              </ul>                
            </section>

            <section class="nav__menu">
              <li href="">Timeframe </li>
              <ul class="nav__menu-lists nav__menu--1-lists">
                <li class="nav__menu-items">Per Year <input type="radio" name="time" value="1"></input></li>
                <li class="nav__menu-items">Five Year Period <input type="radio" name="time" value="5"></input></li>
                <li class="nav__menu-items">Ten Year Period <input type="radio" name="time" value="10"></input></li>
                <li class="nav__menu-items">Twenty Year Period <input type="radio" name="time" value="20"></input></li>
              </ul>
            </section>

            <section class="nav__menu">
              <li href="">Years</li>         
              <ul class="nav__menu-lists nav__menu--1-lists">
                <li class="nav__menu-items1"> Starting - Ending Years
                  <Typography id="discrete-slider-custom" gutterBottom>
                  </Typography>
                  <Slider
                    defaultValue={[1920,2020]}
                    getAriaValueText={Slider.valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="on"
                    marks={Slider.marks,true}
                    min={1960}
                    max={2019}
                    onChange = {this.handleChange}
                  />
                </li>
              </ul>
            </section>
            <section class="nav__menu">
              <button class="button" type="button" onClick={this.handleSubmit}>Submit</button>
            </section>
            <canvas id="myChart" ></canvas>
          </ul>
        </div>
    );
  }
}

 
export default Timeline;
