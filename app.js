require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const nunjucks = require('nunjucks');
const moment = require('moment');
const mysql = require('mysql2');
const { loadCredentials } = require('./credentials');

const app = express();


const env = nunjucks.configure('views', { 
    autoescape: true, 
    express: app 
});


env.addFilter('moment', function(date, format) {
    return moment.unix(date).format(format || 'DD MMMM YYYY, dddd'); 
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

let credentials = null

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

  
    loadCredentials(db).then((data) => {
        credentials = data;
        console.log('Credentials loaded from database:', credentials);
    }).catch((error) => {
        console.error('Error loading credentials:', error);
        process.exit(1); 
    });
});


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());


app.post('/data', async (req, res) => {
   
    let address = encodeURI(req.body['address'])

    const data = await getGeolocationTemperature(address);

    const temperatures = data['weather']['daily']

    res.render('data.html', { 
        temperatures, 
        geolocation: data.geolocation,
        customMessage: "Weather forecast for the week!" 
    });
});

app.get('/history', async (req, res) => {

    const data = await getHistoricalData();

    res.render('history.html', { 
        data
    });
});



async function getGeolocationTemperature(address) {
    let returnData = null;



    try {
        if (!address) {
            throw new Error("Address is required");
        }
        const geolocationConfig = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&proximity=-73.990593%2C40.740121&access_token=${credentials[0]['key_value']}`,
            headers: {}
        };

        const geoResponse = await axios.request(geolocationConfig);
       
        const lng = geoResponse.data['features'][0]['geometry']['coordinates'][0]
        const lat = geoResponse.data['features'][0]['geometry']['coordinates'][1]

        const weatherConfig = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${credentials[1]['key_value']}`,
            headers: {}
        };

        const weatherResponse = await axios.request(weatherConfig);

        returnData = {
            geolocation: geoResponse.data,
            weather: weatherResponse.data
        };

    } catch (error) {
        throw error;
    }

    return returnData;
}

async function getHistoricalData() {
    const query = `
        SELECT * FROM weather
        ORDER BY created_at DESC
        LIMIT 20
    `;

    try {
        
        const results = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject('Error retrieving data from the database.');
                } else {
                    resolve(results);
                }
            });
        });


        console.log(results)
        return results;

    } catch (err) {
        throw new Error(err);
    }
};


app.post('/save', async (req, res) => {


    let addressInput = encodeURI(req.body['address'])
    let data = await getGeolocationTemperature(addressInput) 

    longitude = data['weather']['lon']
    latitude = data['weather']['lat']
    address = req.body['address']
    rain = data['weather']['daily'][0]['rain']
    sun = 100-data['weather']['daily'][0]['clouds']
    humidity = data['weather']['daily'][0]['humidity']
    min_temp = data['weather']['daily'][0]['temp']['min']-273
    max_temp = data['weather']['daily'][0]['temp']['max']-273


    const query = `
        INSERT INTO weather (longitude, latitude, address, rain, sun, humidity, min_temp, max_temp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [longitude, latitude, address, rain, sun, humidity, min_temp, max_temp],
        (err, result) => {
            if (err) {
                return res.status(500).send('Error saving data to the database.');
            }

            console.log('Weather data saved successfully:', result);
            res.send('Weather data saved successfully!');
        }
    );
});



app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
