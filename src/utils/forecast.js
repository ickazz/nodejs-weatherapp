const request = require("postman-request");

const forecast = (longitute, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e8a0b52c591e1cce554116e9c2a3c953&query=" + longitute + "," + latitude

    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, {
                place: body.location.name,
                weather: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast