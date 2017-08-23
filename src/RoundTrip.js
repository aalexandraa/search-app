import React, { Component } from 'react'
import styled from 'styled-components'

const Td = styled.td`
  padding: 5px;
  min-width: 100px;
`

class RoundTrip extends Component {
  render () {
    const trip = this.props.trip
    return (
      <tr>
        {/* <Td>
          Von: {trip.origin} <br />
          Nach: {trip.destination}
        </Td> */}
        <Td>
          Hinfahrt:<br />
          Ab: {trip.bestOutward.start} Uhr<br />
          Bis: {trip.bestOutward.end} Uhr<br />
          Rückfahrt:<br />
          Ab: {trip.bestReturn.start} Uhr<br />
          Bis: {trip.bestReturn.end} Uhr
        </Td>
        {/* <Td>
          Gleis: {trip.departurePlatform}<br />
          Gleis: {trip.arrivalPlatform}
        </Td> */}
        <Td>
          Hinfahrt:<br />
          {trip.bestOutward.duration}<br /><br />
          Rückfahrt:<br />
          {trip.bestReturn.duration}
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
