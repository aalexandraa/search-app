var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/trips', function (request, response) {
  response.json({
    trips: [{
      origin: 'Berlin',
      destination: 'Hamburg',
      departureTime: '8:05',
      arrivalTime: '10:15',
      departurePlatform: '2',
      arrivalPlatform: '19',
      legs: '1',
      price: '29,90EUR'
    },
    {
      origin: 'Berlin',
      destination: 'Hamburg',
      departureTime: '9:30',
      arrivalTime: '12:55',
      departurePlatform: '1',
      arrivalPlatform: '4',
      legs: '2',
      price: '25,90EUR'
    }]
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
