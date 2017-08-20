var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/trips', function (req, res) {
  res.json({
    message: `Ohai there, I will soon return train journeys between ${req.query.origin} & ${req.query.destination} from ${req.query.start} to ${req.query.end} for ${req.query.duration} days. Just you wait.`
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
