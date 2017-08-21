var express = require('express')
var cors = require('cors')
var app = express()
const _ = require('lodash')
const dateFns = require('date-fns')
const prices = require('db-prices')

const options = {
  class: 1,
  noICETrains: false,
  // transferTime: 0,
  // duration: 1440,
  preferFastRoutes: true,
  travellers: [{
    bc: 0,
    typ: 'E'
  }/*, {
    bc: 0,
    typ: 'E'
  }/*, {
    bc: 0,
    typ: 'E'
  }, {
    bc: 0,
    typ: 'E'
  }, {
    bc: 0,
    typ: 'E'
  } */]
}

async function findCheapTrains (from, to, date) {
  const results = await prices(from, to, date, options)

  return {
    from,
    to,
    date,
    trains: _.map(results, result => {
      const start = dateFns.parse(_.first(result.legs).start)
      const end = dateFns.parse(_.last(result.legs).end)
      const duration = end - start

      return {
        result,
        start,
        end,
        duration,
        price: result.price.amount
      }
    })
  }
}

function rankTrains (trains) {
  const minPrice = _.minBy(trains, 'price').price
  const maxPrice = _.maxBy(trains, 'price').price
  const priceSpan = maxPrice - minPrice
  const minStart = dateFns.getHours(_.minBy(trains, 'start').start)
  const maxStart = dateFns.getHours(_.maxBy(trains, 'start').start)
  const startSpan = maxStart - minStart

  return _.map(trains, train => _.extend({
    priceRank: (train.price - minPrice) / priceSpan,
    startRank: (dateFns.getHours(train.start) - minStart) / startSpan
  }, train))
}

async function findRoundtrips ({
  origin,
  destination,
  start,
  end,
  duration
}) {
  const durationDays = duration

  const hinfahrtVon = new Date(start)
  const rueckfahrtBis = new Date(end)
  const difference = 1 + dateFns.differenceInDays(rueckfahrtBis, hinfahrtVon) - durationDays
  const hinfahrtBis = dateFns.addDays(hinfahrtVon, difference)
  const rueckfahrtVon = dateFns.subDays(rueckfahrtBis, difference)

  const hinfahrtDays = dateFns.eachDay(hinfahrtVon, hinfahrtBis)
  const rueckfahrtDays = dateFns.eachDay(rueckfahrtVon, rueckfahrtBis)

  const hinfahrtTrips = _.map(hinfahrtDays, day =>
    [origin, destination, day]
  )

  const rueckfahrtTrips = _.map(rueckfahrtDays, day =>
    [destination, origin, day]
  )

  const trips = hinfahrtTrips.concat(rueckfahrtTrips)

  const results = await Promise.all(_.map(trips, ([from, to, date]) =>
    findCheapTrains(from, to, date))
  )

  if (_.isEmpty(_.flatMap(results, 'trains'))) {
    return []
  }

  const roundtrips = _(results)
    .filter({ from: origin })
    .map(outwardDay => {
      const returnDay = _.find(results, {
        from: destination,
        date: dateFns.addDays(outwardDay.date, durationDays - 1)
      })

      const outwardRanked = _(outwardDay.trains)
        // Doesn’t leave too early (after 6am)
        .filter(train => dateFns.getHours(train.start) >= 7)
        // Doesn’t arrive too late
        .filter(train => dateFns.getHours(train.end) <= 22)
        // Rank
        .thru(rankTrains)
        // Cheap and fast
        .orderBy(train => train.priceRank)
        .value()
        .slice(0, 5)

      const returnRanked = _(returnDay.trains)
        // Doesn’t leave too early (after 6am)
        .filter(train => dateFns.getHours(train.start) >= 12)
        // Doesn’t arrive too late
        .filter(train => dateFns.getHours(train.end) <= 22)
        // Rank
        .thru(rankTrains)
        // Cheap and fast
        .orderBy(train => train.priceRank)
        .value()
        .slice(0, 5)

      const bestOutward = _.first(outwardRanked)
      const bestReturn = _.first(returnRanked)
      const total = bestOutward.price + bestReturn.price

      return {
        bestOutward,
        bestReturn,
        total
        // outwardDay,
        // returnDay
      }
    })
    .value()

  return roundtrips
}

function formatDuration (milliseconds) {
  const minutes = ((milliseconds / 1000) % 3600) / 60
  const hours = ((milliseconds / 1000 - minutes * 60) / 3600)
  return `${hours}h ${minutes}m`
}

app.use(cors())

app.get('/trips', async function (request, response) {
  let roundtrips
  try {
    roundtrips = await findRoundtrips({
      origin: request.query.origin,
      destination: request.query.destination,
      start: request.query.start,
      end: request.query.end,
      duration: request.query.duration
    })
  } catch (error) {
    response
      .status(400)
      .set('Content-Type', 'text/plain')
      .send(error.stack)
    return
  }

  response.json({
    trips: _.map(roundtrips, roundtrip => ({
      ...roundtrip,
      origin: roundtrip.bestOutward.result.origin.name,
      destination: roundtrip.bestOutward.result.destination.name,
      departureTime: dateFns.format(_.first(roundtrip.bestOutward.result.legs).start, 'HH:mm'),
      arrivalTime: dateFns.format(_.first(roundtrip.bestOutward.result.legs).end, 'HH:mm'),
      departurePlatform: _.first(roundtrip.bestOutward.result.legs).departurePlatform,
      arrivalPlatform: _.last(roundtrip.bestOutward.result.legs).arrivalPlatform,
      duration: formatDuration(roundtrip.bestOutward.duration),
      legs: _.size(roundtrip.bestOutward.result.legs),
      price: `${roundtrip.total} EUR`
    }))
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
