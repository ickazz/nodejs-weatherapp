const request = require('postman-request');

const geocode = (address, callback) => {
    const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoiaWthenoiLCJhIjoiY2w0eDVvenZwMDJ5cjNqcWZ5ODRqOWs1NiJ9.Oq6-6ZwnZA2U8vwmcV7aZA&limit=1"

    request({url: geoUrl, json: true}, (error, {body}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try again please!", undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode