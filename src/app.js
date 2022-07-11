const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Forecast App',
        author: 'Ikazz'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide the address!"
        })
    }

    geocode(req.query.address, (error, {location, longitude, latitude} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, {weather, temp, feelslike}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                address: req.query.address,
                location: location,
                weather: weather,
                temperature: temp,
                feelslike: feelslike
            })

        })
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        aboutContent: 'Some content placeholder'
    })
})

// Mora da bude na poslednjem mestu pre listenera!!!
app.get('*', (req, res) => {
    res.send("404 page")
})

app.listen(port, () => {
    console.log("Server is up and running on port: " + port)
})

// const currentYear = new Date().getFullYear()