/* Eftihia Kiafa 3003,
   Grigoria Nikita 3048,
   Eirini Mouselli 3031
*/

const express =require('express'); 
const cors = require('cors'); 
const mysql = require('mysql'); 
const app= express(); 
app.use(cors());
app.use(express.json());

const connection=mysql.createConnection({
  host:'localhost',
  user:'', //enter username of local server
  password:'', //enter the corresponding password
  database:'metrics_db' // change this if you named your database differently
});

connection.connect(err =>{
  if(err){
    trhrow(err);
  }
});


app.post('/D3Timeline',(request,response)=> {
  var data = request.body; 

  if(data.selectedFrame == "1"){ 
    var countriesString = "";
    var indicatorsString = "";
    console.log("Received query");

    for(var i=0; i< data.checkedCountries.length; i++){
      if(i === 0){
          countriesString = countriesString.concat("(M.c_code = '" + data.checkedCountries[i] +"'" );
      }else{
          countriesString = countriesString.concat(" OR M.c_code = '" + data.checkedCountries[i]+"'");
      }
    }

    for(var j=0; j< data.checkedIndicators.length; j++){
      if(j === 0){
        indicatorsString = indicatorsString.concat("(M.i_code = '"+ data.checkedIndicators[j]+"'");
      }else{
        indicatorsString = indicatorsString.concat(" OR M.i_code = '"+ data.checkedIndicators[j]+"'");
      }
    } 
    
    countriesString = countriesString.concat(")");
    indicatorsString = indicatorsString.concat(")");
    
    var msql = "SELECT M.i_code, M.c_code, M.measurement, M.i_year FROM M WHERE "+countriesString+" AND "+indicatorsString+" AND M.i_year >= "+data.startY+" AND M.i_year <= "+data.endY;
    connection.query( msql,function (err,results){
      if(err){
        throw(err);
      }
      response.json(results);
    }); 
  }else if(data.selectedFrame == "5" || data.selectedFrame == "10" || data.selectedFrame == "20"){
    var yearsColumn = ""
    var countriesString = "";
    var indicatorsString = "";
    console.log("Received query");

    if(data.selectedFrame == "5"){
      yearsColumn = "YEARS.five_year_period"
    }else if(data.selectedFrame == "10"){
      yearsColumn = "YEARS.ten_year_period"
    }else{
      yearsColumn = "YEARS.twenty_year_period"
    }

    for(var i=0; i< data.checkedCountries.length; i++){
      if(i === 0){
          countriesString = countriesString.concat("(M.c_code = '" + data.checkedCountries[i] +"'" );
      }else{
          countriesString = countriesString.concat(" OR M.c_code = '" + data.checkedCountries[i]+"'");
      }
    }

    for(var j=0; j< data.checkedIndicators.length; j++){
      if(j === 0){
        indicatorsString = indicatorsString.concat("(M.i_code = '"+ data.checkedIndicators[j]+"'");
      }else{
        indicatorsString = indicatorsString.concat(" OR M.i_code = '"+ data.checkedIndicators[j]+"'");
      }
    } 
    countriesString = countriesString.concat(")");
    indicatorsString = indicatorsString.concat(")");
    
    var msql = "SELECT M.i_code, M.c_code, "+yearsColumn+", AVG(M.measurement) AS measurement FROM M INNER JOIN YEARS ON M.i_year = YEARS.i_year WHERE "
    +countriesString+" AND "+indicatorsString+" AND M.i_year >= "+data.startY+" AND M.i_year <= "+data.endY 
    +" GROUP BY  M.c_code, M.i_code, " +yearsColumn;
    connection.query( msql,function (err,results){
      if(err){
        throw(err);
      }
      response.json(results);
    }); 

 }
});

app.post('/D3ScatterPlot',(request,response)=> {
  var data = request.body; 

  if(data.selectedFrame == "1"){ 
    var countriesString = "";
    var indicatorsString = "";
    console.log("Received query");

    for(var i=0; i< data.checkedCountries.length; i++){
      if(i === 0){
          countriesString = countriesString.concat("(M.c_code = '" + data.checkedCountries[i] +"'" );
      }else{
          countriesString = countriesString.concat(" OR M.c_code = '" + data.checkedCountries[i]+"'");
      }
    }

    for(var j=0; j< data.checkedIndicators.length; j++){
      if(j === 0){
        indicatorsString = indicatorsString.concat("(M.i_code = '"+ data.checkedIndicators[j]+"'");
      }else{
        indicatorsString = indicatorsString.concat(" OR M.i_code = '"+ data.checkedIndicators[j]+"'");
      }
    } 
    
    countriesString = countriesString.concat(")");
    indicatorsString = indicatorsString.concat(")");
    
    var msql = "SELECT M.i_code, M.c_code, M.measurement, M.i_year FROM M WHERE "+countriesString+" AND "+indicatorsString+" AND M.i_year >= "+data.startY+" AND M.i_year <= "+data.endY;
    connection.query( msql,function (err,results){
      if(err){
        throw(err);
      }
      response.json(results);
    }); 
  }else if(data.selectedFrame == "5" || data.selectedFrame == "10" || data.selectedFrame == "20"){
    var yearsColumn = ""
    var countriesString = "";
    var indicatorsString = "";
    console.log("Received query");

    if(data.selectedFrame == "5"){
      yearsColumn = "YEARS.five_year_period"
    }else if(data.selectedFrame == "10"){
      yearsColumn = "YEARS.ten_year_period"
    }else{
      yearsColumn = "YEARS.twenty_year_period"
    }

    for(var i=0; i< data.checkedCountries.length; i++){
      if(i === 0){
          countriesString = countriesString.concat("(M.c_code = '" + data.checkedCountries[i] +"'" );
      }else{
          countriesString = countriesString.concat(" OR M.c_code = '" + data.checkedCountries[i]+"'");
      }
    }

    for(var j=0; j< data.checkedIndicators.length; j++){
      if(j === 0){
        indicatorsString = indicatorsString.concat("(M.i_code = '"+ data.checkedIndicators[j]+"'");
      }else{
        indicatorsString = indicatorsString.concat(" OR M.i_code = '"+ data.checkedIndicators[j]+"'");
      }
    } 
    countriesString = countriesString.concat(")");
    indicatorsString = indicatorsString.concat(")");
    
    var msql = "SELECT M.i_code, M.c_code, "+yearsColumn+", AVG(M.measurement) AS measurement FROM M INNER JOIN YEARS ON M.i_year = YEARS.i_year WHERE "
    +countriesString+" AND "+indicatorsString+" AND M.i_year >= "+data.startY+" AND M.i_year <= "+data.endY 
    +" GROUP BY  M.c_code, M.i_code, " +yearsColumn;
    connection.query( msql,function (err,results){
      if(err){
        throw(err);
      }
      response.json(results);
    }); 
  }
});

app.post('/D3BarChart',(request,response)=> {
var data = request.body; 
if(data.selectedFrame == "1"){ 
    var countriesString = "";
    var indicatorsString = "";
    console.log("Received query");

    for(var i=0; i< data.checkedCountries.length; i++){
      if(i === 0){
          countriesString = countriesString.concat("(M.c_code = '" + data.checkedCountries[i] +"'" );
      }else{
          countriesString = countriesString.concat(" OR M.c_code = '" + data.checkedCountries[i]+"'");
      }
    }

    for(var j=0; j< data.checkedIndicators.length; j++){
      if(j === 0){
        indicatorsString = indicatorsString.concat("(M.i_code = '"+ data.checkedIndicators[j]+"'");
      }else{
        indicatorsString = indicatorsString.concat(" OR M.i_code = '"+ data.checkedIndicators[j]+"'");
      }
    } 
    
    countriesString = countriesString.concat(")");
    indicatorsString = indicatorsString.concat(")");
    
    var msql = "SELECT M.i_code, M.c_code, M.measurement, M.i_year FROM M WHERE "+countriesString+" AND "+indicatorsString+" AND M.i_year >= "+data.startY+" AND M.i_year <= "+data.endY;
    connection.query( msql,function (err,results){
      if(err){
        throw(err);
      }
      response.json(results);
    }); 
  }else if(data.selectedFrame == "5" || data.selectedFrame == "10" || data.selectedFrame == "20"){
    var yearsColumn = ""
    var countriesString = "";
    var indicatorsString = "";
    console.log("Received query");

    if(data.selectedFrame == "5"){
      yearsColumn = "YEARS.five_year_period"
    }else if(data.selectedFrame == "10"){
      yearsColumn = "YEARS.ten_year_period"
    }else{
      yearsColumn = "YEARS.twenty_year_period"
    }

    for(var i=0; i< data.checkedCountries.length; i++){
      if(i === 0){
          countriesString = countriesString.concat("(M.c_code = '" + data.checkedCountries[i] +"'" );
      }else{
          countriesString = countriesString.concat(" OR M.c_code = '" + data.checkedCountries[i]+"'");
      }
    }

    for(var j=0; j< data.checkedIndicators.length; j++){
      if(j === 0){
        indicatorsString = indicatorsString.concat("(M.i_code = '"+ data.checkedIndicators[j]+"'");
      }else{
        indicatorsString = indicatorsString.concat(" OR M.i_code = '"+ data.checkedIndicators[j]+"'");
      }
    } 
    countriesString = countriesString.concat(")");
    indicatorsString = indicatorsString.concat(")");
    
    var msql = "SELECT M.i_code, M.c_code, "+yearsColumn+", AVG(M.measurement) AS measurement FROM M INNER JOIN YEARS ON M.i_year = YEARS.i_year WHERE "
    +countriesString+" AND "+indicatorsString+" AND M.i_year >= "+data.startY+" AND M.i_year <= "+data.endY 
    +" GROUP BY  M.c_code, M.i_code, " +yearsColumn;
    connection.query( msql,function (err,results){
      if(err){
        throw(err);
      }
      response.json(results);
    }); 
  }
});

app.listen(5000,() => 
  console.log('server listening on 5000'));
