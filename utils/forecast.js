const axios = require('axios');


const { url, access_key } = {
    url: 'http://api.weatherstack.com/current',
    access_key: '241b0b1320f74ced8cfea7f09f7c7a09'
};


const forecast = async (latitude, longitude, callback) => {
    const query = `${url}?access_key=${access_key}&query=${latitude},${longitude}`;
    try {
        const {data} = await axios(query);
        const { current } = data;
        const { temperature, precip} = current;
        
        if(data.error)
            callback('Unable to find location!', undefined);
        else
            callback(undefined, `Mostly ${current.weather_descriptions[0]} throughout the day. It is currently ${temperature} degress out. There is a ${precip}% chance of rain`);
    } catch (e) {
        callback('Unable to connect to weather Service!', undefined);
    }
}

module.exports = { forecast };