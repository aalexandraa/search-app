import React, { Component } from 'react'
// import styled from 'styled-components'

class Results extends Component {
  render () {
    return (
      <div className='results'>
        <table>
          <tr>
            <th>Bahnhöfe</th>
            <th>Abfahrts-/Ankunftszeit</th>
            <th>Gleis</th>
            <th>Fahrtzeit</th>
            <th>Umsteigen</th>
            <th>Preis</th>
          </tr>
          <tr>
            <td>Von: Berlin<br />Nach: Hamburg</td>
            <td>Ab: 8:05Uhr<br />Bis: 10:15 Uhr</td>
            <td>Gleis: 2<br /> Gleis: 19</td>
            <td>2h10</td>
            <td>0</td>
            <td>29,90EUR</td>
          </tr>
          <tr>
            <td>Von: Berlin<br />Nach: Hamburg</td>
            <td>Ab: 9:30Uhr<br />Bis: 12:55 Uhr</td>
            <td>Gleis: 1<br /> Gleis: 4</td>
            <td>3h25</td>
            <td>1</td>
            <td>25,90EUR</td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Results
