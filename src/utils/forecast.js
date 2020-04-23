const request = require('request')

const forecast = (lat,long,callback) => {

    const url =  'http://api.weatherstack.com/current?access_key=2c214b163050b27d916261c68a7dbf1a&query='+ lat +','+ long
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service! Please try later', undefined)
        } else if (body.error) {
            callback('Unable to find the location for forecast', undefined)
        } else {
            const temperature = body.current.temperature
            const precipChance = body.current.precip * 100
            const msg =  'It is currently ' + temperature + ' degrees out there. There is a ' + precipChance + ' % chance of rain'
            callback(undefined,msg)
        }
    })
   
}

module.exports = forecast
