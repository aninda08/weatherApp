const axios = require('axios');
const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');
const express = require('express');
const path = require('path');
const hbs = require('hbs');

//create express server
const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express and handlebar config
const publicDirPath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');

//Setup handlbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Aninda Sundar Chakraborty'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Aninda Sundar Chakraborty',
        details: 'Full Stack Software Developer'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'About page not found'
    });
});

//Setup error page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});




























// const address = process.argv[2];

// if(!address)
//     console.log('Please provide an address');
// else
//     geocode(address, (error, { location, latitude, longitude} = {}) => {
//         if(error)
//             console.log(error);
//         else {
//             console.log(location);

//             forecast(latitude, longitude, (error, data) => {
//                 if(error)
//                     console.log(error);
//                 else
//                     console.log( data);
//             });
//         }
        
//     });