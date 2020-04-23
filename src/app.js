const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const htmlPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(htmlPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Santhosh'
    })
})

app.get ('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Santhosh'
    })
})

app.get ('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Please reach to system administrator at 1800-233-555',
        name: 'Santhosh'
    })
})

app.get('/weather',(req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Please provide a valid location address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: error
            })       
        } 
        forecast(latitude, longitude, (error,forecastData) => {
            if (error) {
                return res.send({
                    error: error
                }) 
            }      
            
            res.send({
                location: location,
                weatherMsg: forecastData
            }) 
        })
    })
})

app.get('/help/*',(req, res) => {
    res.render ('errorpage', {
        title: 'Error Page',
        errorMessage: 'Help Article not found',
        name: 'Santhosh'
    })
})

app.get('*',(req, res) => {
    res.render ('errorpage', {
        title: 'Error Page',
        errorMessage: 'Page not found',
        name: 'Santhosh'
    })
})

app.listen(3000, () => {
    console.log ('server starting at port 3000')
})