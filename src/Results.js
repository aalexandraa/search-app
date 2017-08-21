import React, { Component } from 'react'
import styled from 'styled-components'
// import qs from 'qs'

const Title = styled.h1`
    font-size: 1.5em;
    text-align: left;
    color: palevioletred;
    margin-top: 20px;
`

const Th = styled.th`
  font-size: 1em;
  text-align: left;
  padding: 5px;
  color: palevioletred;
`

const Td = styled.td`
  padding: 5px;
  min-width: 100px;
`

const Table = styled.table`
border: 1px solid #aaa;
border-radius: 4px;
`

// class Yolo {
//   componentDidMount () {
//     this.fetchTrips()
//   }
//
//   async fetchTrips () {
//     const params = qs.stringify({
//       origin: this.props.origin,
//       destination: this.props.destination,
//       start: this.props.start,
//       end: this.props.end,
//       duration: this.props.duration
//     })
//     const response = await fetch(`http://localhost:3001/trips?${params}`)
//     const json = await response.json()
//     this.setState(json)
//   }
// }

class Results extends Component {
  componentDidMount () {
    this.fetchTrips()
  }

  async fetchTrips () {
    // const params = qs.stringify({
    //   origin: this.props.origin,
    //   destination: this.props.destination,
    //   start: this.props.start,
    //   end: this.props.end,
    //   duration: this.props.duration
    // })
    const response = await fetch(`http://localhost:3001/trips?origin=Hamburg&destination=Berlin&duration=4&start=2017-10-01&end=2017-10-31`)
    const json = await response.json()
    this.setState(json)
  }
  render () {
    console.log(this.state)
    return (
      <div className='results'>
        <Title>Results:</Title>
        <Table>
          <thead>
            <tr>
              <Th>Bahnhöfe</Th>
              <Th>Abfahrts-/Ankunftszeit</Th>
              <Th>Gleis</Th>
              <Th>Fahrtzeit</Th>
              <Th>Umsteigen</Th>
              <Th>Preis</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>Von: Berlin<br />Nach: Hamburg</Td>
              <Td>Ab: 8:05 Uhr<br />Bis: 10:15 Uhr</Td>
              <Td>Gleis: 2<br /> Gleis: 19</Td>
              <Td>2h10</Td>
              <Td>0</Td>
              <Td>29,90EUR</Td>
            </tr>
            <tr>
              <Td>Von: Berlin<br />Nach: Hamburg</Td>
              <Td>Ab: 9:30 Uhr<br />Bis: 12:55 Uhr</Td>
              <Td>Gleis: 1<br /> Gleis: 4</Td>
              <Td>3h25</Td>
              <Td>1</Td>
              <Td>25,90 EUR</Td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Results
