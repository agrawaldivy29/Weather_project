const { log } = require("console");
const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

    // res.send("Server is up");
});

app.post("/", (req, res) => {

    var cityName = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=646e7ec7da5db8a92b0f1ea5afa33180&units=metric";

    https.get(url, function (response) {
        // console.log(response);

        response.on("data", function (data) {
            // console.log(data); //Data is received in hexadecimal code
            const dataJS = JSON.parse(data); //This converts the data into JS Object
            // console.log(dataJS);

            var temp = dataJS.main.temp;
            // console.log(temp);
            var weatherDescription = dataJS.weather[0].description;
            // console.log(weatherDescription);
            res.write("<h1>The Weather description: " + weatherDescription + "</h1>");
            res.write("<h1>The temperature in " + cityName + " is " + temp + " degree Celsius</h1>");

            const icon = dataJS.weather[0].icon;

            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<img src=" + imgURL + ">");
            res.send();
        })
    })

})

app.listen(3000, () => console.log("Server has started")
);
