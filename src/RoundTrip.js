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

const Tr = styled.tr`
box-shadow: 0px 0px 1px 0px black;
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
      <Tr>
        {/* <Td>
          Von: {trip.origin} <br />
          Nach: {trip.destination}
        </Td> */}
        <TdFahrten>
          Vom: {moment(trip.bestOutward.start).format('DD.MM.YYYY')}<br /><br />
          Ab: {moment(trip.bestOutward.start).format('HH:mm')} Uhr<br />
          Bis: {moment(trip.bestOutward.end).format('HH:mm')} Uhr<br /><br />
          Fahrtzeit: {formatDuration(trip.bestOutward.duration)}
        </TdFahrten>
        {/* <Td>
          Gleis: {trip.departurePlatform}<br />
          Gleis: {trip.arrivalPlatform}
        </Td> */}
        <TdFahrten>
          Bis: {moment(trip.bestReturn.start).format('DD.MM.YYYY')}<br /><br />
          Ab: {moment(trip.bestReturn.start).format('HH:mm')} Uhr<br />
          Bis: {moment(trip.bestReturn.end).format('HH:mm')} Uhr<br /><br />
          Fahrtzeit: {formatDuration(trip.bestReturn.duration)}
        </TdFahrten>
        {/* <Td>
          {trip.legs}
        </Td> */}
        <TdPreis>
          {trip.price} €
        </TdPreis>
        <Td>Zur Buchung</Td>
      </Tr>
    )
  }
}

export default RoundTrip
