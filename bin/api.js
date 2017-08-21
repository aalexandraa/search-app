var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/trips', function (request, response) {
  response.json({
    message: `Ohai there, I will soon return train journeys between ${request.query.origin} & ${request.query.destination} from ${request.query.start} to ${request.query.end} for ${request.query.duration} days. Just you wait.`
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
