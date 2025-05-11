import express from "express"
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
 
const API_KEY = process.env.OPENWEATHER_API_KEY
// console.log(API_KEY)

app.use(express.static("public"));

// app.use('/node_modules', express.static('node_modules'));

app.use(bodyParser.urlencoded({ extended: true }));

function getLocalTime(weatherData) {
    const localTime = new Date((weatherData.dt + weatherData.timezone) * 1000);
    
    return localTime.toLocaleString('en-GB', { 
        timeZone: 'UTC',
        dateStyle: 'full', 
        timeStyle: 'short' 
    });
    
}

app.post("/", async (req, res) => {
    try {
        const city = req.body.city;

        if (!city) {
            return res.render("index.ejs", { 
                initialLoad: false,
                error: "Please enter a city name.",
            });
        }

        const geocodeAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`

        const geoResponse = await axios.get(geocodeAPI)

        if (!geoResponse.data || geoResponse.data.length === 0) {
            return res.render("index.ejs", { 
                initialLoad: false,
                error: `City "${city}" not found. Please try again.`,
            });
        }

        const geoResult = geoResponse.data[0]
        const { lat, lon } = geoResult
        
        
        const curWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        const curWeatherResponse = await axios.get(curWeatherURL)
        const curWeatherResult = curWeatherResponse.data
        const curCityTimeStamp = curWeatherResult.dt;
        const curtime = getLocalTime(curWeatherResult)
      
        const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        const forecastResponse = await axios.get(forecastURL)
        const forecastResult = forecastResponse.data
        

        const futureForecast = forecastResult.list.filter( forecast => {
            return forecast.dt > curCityTimeStamp
        });
        
        const forecast_5 = futureForecast.slice(0, 5)

       
        forecast_5.forEach(forecast => {
            const forecastLocalTime = new Date((forecast.dt + forecastResult.city.timezone) * 1000);
            forecast.formatted_time = forecastLocalTime.toLocaleString('en-GB', { 
                timeZone: 'UTC',
                dateStyle: 'short', 
                timeStyle: 'short' 
            });
        });

        res.render("index.ejs", { 
            initialLoad: false,
            content: geoResult, 
            weather:forecast_5, 
            current: curWeatherResult, 
            currentTime: curtime
        });
      
    } catch (error) {
        console.error("Error:", error.message);
        res.render("index.ejs", { 
            initialLoad: false,
            error: "An error occurred while fetching weather data. Please try again.",
        });
    }
    
});

app.get("/", (req, res) => {
    res.render("index.ejs", { 
        initialLoad: true,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});