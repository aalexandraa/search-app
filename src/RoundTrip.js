import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Td = styled.td`
  padding: 5px;
  min-width: 100px;
`

function formatDuration (milliseconds) {
  const minutes = ((milliseconds / 1000) % 3600) / 60
  const hours = ((milliseconds / 1000 - minutes * 60) / 3600)
  return `${hours}h ${minutes}m`
}

class RoundTrip extends Component {
  render () {
    const trip = this.props.trip

    console.log(trip)

    return (
      <tr>
        {/* <Td>
          Von: {trip.origin} <br />
          Nach: {trip.destination}
        </Td> */}
        <Td>
          Hinfahrt:<br />
          Ab: {moment(trip.bestOutward.start).format('HH:mm')} Uhr<br />
          Bis: {moment(trip.bestOutward.end).format('HH:mm')} Uhr<br /><br />
          Rückfahrt:<br />
          Ab: {moment(trip.bestReturn.start).format('HH:mm')} Uhr<br />
          Bis: {moment(trip.bestReturn.end).format('HH:mm')} Uhr
        </Td>
        {/* <Td>
          Gleis: {trip.departurePlatform}<br />
          Gleis: {trip.arrivalPlatform}
        </Td> */}
        <Td>
          Hinfahrt:<br />
          {formatDuration(trip.bestOutward.duration)}<br /><br />
          Rückfahrt:<br />
          {formatDuration(trip.bestReturn.duration)}
        </Td>
        {/* <Td>
          {trip.legs}
        </Td> */}
        <Td>
          Preis gesamt:<br />
          {trip.price}
        </Td>
      </tr>
    )
  }
}

export default RoundTrip
