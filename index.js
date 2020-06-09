const axios = require('axios');
const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const address = process.argv[2];

if(!address)
    console.log('Please provide an address');
else
    geocode(address, (error, { location, latitude, longitude} = {}) => {
        if(error)
            console.log(error);
        else {
            console.log(location);

            forecast(latitude, longitude, (error, data) => {
                if(error)
                    console.log(error);
                else
                    console.log( data);
            });
        }
        
    });

