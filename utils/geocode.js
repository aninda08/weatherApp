const axios = require('axios');

const { url, access_key } = {
    url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    access_key: 'pk.eyJ1IjoiYW5pbmRhMDgiLCJhIjoiY2tiNnV0bHl2MDJkZDJzcDZweXV1aHBsNSJ9.d9bPgPpBb-EQxn_uXQFoD'
};

const geocode = async (address, callback) => {
    const query = `${url}${address}.json?access_token=${access_key}`;

    try {
        const { data } = await axios(query);
        if(data.features.length == 0)
            callback('Unable to find location. Try another search.', undefined);
        else
            callback(undefined, {
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            });
    } catch (e) {
        callback('Unable to connect to location Service!', undefined);
    } 
}

module.exports = { geocode };