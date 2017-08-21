var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/trips', function (request, response) {
  response.json({
    trips: [{
      origin: 'Hamburg',
      destination: 'München',
      departureTime: '9:05',
      arrivalTime: '11:15',
      departurePlatform: '4',
      arrivalPlatform: '20',
      duration: '3h10',
      legs: '4',
      price: '39,90EUR'
    },
    {
      origin: 'Berlin',
      destination: 'Hamburg',
      departureTime: '9:30',
      arrivalTime: '12:55',
      departurePlatform: '1',
      arrivalPlatform: '4',
      duration: '3h17',
      legs: '2',
      price: '25,90EUR'
    }]
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
