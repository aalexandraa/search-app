import _ from 'lodash'
import React, { Component } from 'react'
import RoundTrip from './RoundTrip'
import styled from 'styled-components'

const isDev = window.location.hostname === 'localhost'
const apiBaseURL = isDev
  ? 'http://localhost:3001'
  : ''

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

const Thead = styled.thead`
box-shadow: 0px 0px 1px 0px black;
`

const Table = styled.table`
border: 1px solid #aaa;
border-radius: 4px;
`

class Results extends Component {
  componentDidMount () {
    this.fetchTrips()
  }

  async fetchTrips () {
    const origin = this.props.origin
    const destination = this.props.destination
    const duration = this.props.duration
    const start = this.props.start.format('YYYY-MM-DD')
    const end = this.props.end.format('YYYY-MM-DD')

    const response = await window.fetch(`${apiBaseURL}/trips?origin=${origin}&destination=${destination}&duration=${duration}&start=${start}&end=${end}`)
    const json = await response.json()
    this.setState(json)
  }

  render () {
    if (this.state === null) {
      return (
        <p>Loading</p>
      )
    }

    return (
      <div className='results'>
        <Title>Results:</Title>
        <p>Here are the best results for your trip from {this.state.trips[0].origin} to {this.state.trips[0].destination}:</p>
        <Table>
          <Thead>
            <tr>
              {/* <Th>Bahnhöfe</Th> */}
              <Th>🚆➡️</Th>
              {/* <Th>Gleis</Th> */}
              <Th>⬅️🚆</Th>
              {/* <Th>Umsteigen</Th> */}
              <Th>💶</Th>
              <Th />
            </tr>
          </Thead>
          <tbody>
            { this.state.trips.map((trip, key) =>
              <RoundTrip
                key={key}
                trip={trip}
              />
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Results
