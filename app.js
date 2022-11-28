const express = require("express");
const https = require("https"); //allows us to request data from different websites using only native nodejs
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const query = req.body.query;
  const apiKey = "bfca281eac9de449b16309b0ce45b4c0";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
  https.get(url, function (response){
    console.log(response.statusCode);
    
    response.on("data", function(data){
      console.log(data);
      const weatherData = JSON.parse(data);
      const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      res.write(`<p>The weather is currently ${weatherData.weather[0].description}<p>`)
      res.write(`<h1>The temperature in ${weatherData.name} is ${weatherData.main.temp} degrees in Celsius</h1>`);
      res.write(`<img src="${iconUrl}" alt="weather_icon">`);
      res.send();
    })
  })
})
// When user are on main page of our website we make a request to weather api to send us some data
app.get("/", function(req, res){

  const query = "London";
  const apiKey = "bfca281eac9de449b16309b0ce45b4c0";
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
  https.get(url, function (response){
    console.log(response.statusCode);
    response.on("data", function(data){
      console.log(data);
      const weatherData = JSON.parse(data);
      const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      res.write(`<p>The weather is currently ${weatherData.weather[0].description}<p>`)
      res.write(`<h1>The temperature in ${weatherData.name} is ${weatherData.main.temp} degrees in Celsius</h1>`);
      res.write(`<img src="${iconUrl}" alt="weather_icon">`);

      console.log(iconUrl);
      // https.get(iconUrl, function(response){
      //   console.log(response);
      // })

      res.send();
    })
  }) //make a request to this web site

})


app.listen(3000, function(){
  console.log("Server running on port 3000");
})
