const express = require("express");


const https = require("https");         //native module of node to get requests

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//response to our request from https protocol
app.get("/",function(req,res){

   res.sendFile(__dirname + "/index.html")

  // res.send("server is up and running");
});

app.post("/",function(req,res){
  console.log(req.body.cityName);
//  console.log("Post request received");

// //by following 3 lines we can get values for any city.
 const query = req.body.cityName;
 const apikey = "9fe43d507f08499c7e0adc6624a551fc";
 const unit = "metric";
 const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey +"&units=" + unit;
   https.get(url,function(response){
//      console.log(response.statusCode);

     response.on("data",function(data){
   const weatherData = JSON.parse(data);    //created json object to parse the data into actual text or string
//     console.log(weatherData);
    const temp = weatherData.main.temp;   //getting a particular data value from thre bigger string
//    console.log(temp);

   const weatherDescription = weatherData.weather[0].description;
//   console.log(weatherDescription);
   const icon = weatherData.weather[0].icon;
   imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
     res.write("<p>The weather is currently " + weatherDescription + "</p>");
     res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
     res.write("<img src=" + imageurl + ">");
     res.send();

 /*
   const object = {
     name: "Yogesh",
     favouriteFood : "All"
   }
   console.log(JSON.stringify(object));    ////to give the result clubbed into a single singlke
 */
     })

   })




});


app.listen(3000,function(){
  console.log("Server started at port 3000");
});
