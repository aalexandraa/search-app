import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'

const TdFahrten = styled.td`
  padding: 5px;
  min-width: 120px;
`
const TdPreis = styled.td`
padding: 5px;
min-width: 80px;
`
const Td = styled.td`
padding: 5px;
min-width: 80px;
`

function formatDuration (milliseconds) {
  const minutes = ((milliseconds / 1000) % 3600) / 60
  const hours = ((milliseconds / 1000 - minutes * 60) / 3600)
  return `${hours}h ${minutes}m`
}

class RoundTrip extends Component {
  render () {
    const trip = this.props.trip

    return (
      <tr>
        {/* <Td>
          Von: {trip.origin} <br />
          Nach: {trip.destination}
        </Td> */}
        <TdFahrten>
          Ab: {moment(trip.bestOutward.start).format('HH:mm')} Uhr<br />
          Bis: {moment(trip.bestOutward.end).format('HH:mm')} Uhr<br />
          Fahrtzeit:
          {formatDuration(trip.bestOutward.duration)}
        </TdFahrten>
        {/* <Td>
          Gleis: {trip.departurePlatform}<br />
          Gleis: {trip.arrivalPlatform}
        </Td> */}
        <TdFahrten>
          Ab: {moment(trip.bestReturn.start).format('HH:mm')} Uhr<br />
          Bis: {moment(trip.bestReturn.end).format('HH:mm')} Uhr<br />
          Fahrtzeit: {formatDuration(trip.bestReturn.duration)}
        </TdFahrten>
        {/* <Td>
          {trip.legs}
        </Td> */}
        <TdPreis>
          {trip.price}
        </TdPreis>
        <Td>Zur Buchung</Td>
      </tr>
    )
  }
}

export default RoundTrip
