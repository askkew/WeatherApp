const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//======================================================
const urltest = `https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=7402bcd03e0b88f6c75855bda3497673`


app.get("/fetchWeather", (req, res) => {
    axios.get(urltest)
        .then((response) => { // first data fetch
            const newDataObj = {};
            let nameKey = {};
            if (response?.data) {
                const { name, weather, main, sys, wind } = response.data;
                newDataObj.name = name;
                newDataObj.weather = weather;
                newDataObj.main = main;
                newDataObj.sys = sys;
                newDataObj.wind = wind;

                nameKey = name;``
            } 
            return { newDataObj, nameKey };
        })
        .then(({ newDataObj, nameKey }) => { // second data fetch
            let locationKey = {};

            const locationkeyurl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=GkTpopNR6k4CajJOGJpgfkrY86BN80Dp&q=${nameKey}`
            axios.get(locationkeyurl).then((response2) => {
                if (response2?.data) {
                    const { Key } = response2.data[0];
                    locationKey = Key;
                } 
                return { newDataObj, locationKey };

            })
            .then(({ newDataObj, locationKey }) => { // third data fetch
                const forecasturl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=GkTpopNR6k4CajJOGJpgfkrY86BN80Dp`
                axios.get(forecasturl).then((forecastResponse) => {
                    if (forecastResponse?.data) {
                        newDataObj.forecast = [];
                        forecastResponse.data.forEach((dataPoint, i) => {
                            if (i < 6) {
                                const { DateTime, IsDaylight, Temperature, WeatherIcon} = dataPoint;
                                const { Unit, Value } = Temperature;
                                const forecastPoint = {
                                    DateTime: DateTime,
                                    Temperature: Temperature,
                                    WeatherIcon: WeatherIcon,
                                    Unit: Unit,
                                    Value: Value,
                                }
                                if (i === 0) {
                                    const { PrecipitationProbability } = dataPoint;
                                    newDataObj.PrecipitationProbability = PrecipitationProbability;
                                    newDataObj.IsDaylight = IsDaylight;
                                }
                                newDataObj.forecast.push(forecastPoint);
                            }
                        });
                    }
                    res.send(newDataObj);
                })
            })
        })
});

//======================================================
app.listen(port, () => {
    console.log(`Backend is listening on port ${port}!`);
})
