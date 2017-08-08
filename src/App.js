import React, { Component } from 'react'
import stations from './stations.json'
import Autosuggest from 'react-autosuggest'
import _ from 'lodash'

import './App.css'

// // Imagine you have a list of languages that you'd like to autosuggest.
// const languages = [
//   {
//     name: 'C',
//     year: 1972
//   },
//   {
//     name: 'Elm',
//     year: 2012
//   }
// ]

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  const matchingStations = inputLength === 0
    ? []
    : stations.filter(station =>
      station.name.toLowerCase().slice(0, inputLength) === inputValue
    )

  return _.sortBy(matchingStations,
    station => station.name.match(/hbf|hauptbahnhof/i)
  )
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      originValue: '',
      originSuggestions: [],
      departure: '',
      destination: '',
      date: '4',
      id: ''
    }

    // this.handleChangeDeparture = this.handleChangeDeparture.bind(this)
    this.handleChangeDestination = this.handleChangeDestination.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.onOriginChange = this.onOriginChange.bind(this)
    this.onOriginSuggestionsFetchRequested = this.onOriginSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
  }

  // handleChangeDeparture (event) {
  //   this.setState({departure: event.target.value})
  // }

  handleChangeDestination (event) {
    this.setState({destination: event.target.value})
  }

  handleChangeDate (event) {
    this.setState({date: event.target.value})
  }

  onOriginChange (event, { newValue }) {
    this.setState({originValue: newValue})
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onOriginSuggestionsFetchRequested ({ value }) { // TODO: Change this too?
    this.setState({
      originSuggestions: getSuggestions(value)
    })
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested () {
    this.setState({
      originSuggestions: []
    })
  };

  onSuggestionSelected (event, { suggestion }) {
    this.setState({
      departure: suggestion.id
    })
  }

  render () {
    const { originValue, originSuggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'To',
      value: originValue,
      onChange: this.onOriginChange
    }
    return (
      <div className='App'>
        <div className='App-header'>
          <h1>Cheapest Train Finder App</h1>
        </div>
        <div className='App-intro'>
          <Autosuggest
            suggestions={originSuggestions}
            onSuggestionsFetchRequested ={this.onOriginSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
          <br />
          <input
            placeholder='To'
            onChange={this.handleChangeDestination}
            value={this.state.destination}
          />
        </div>
        <div>
          <select
            onChange={this.handleChangeDate}
            defaultValue={this.state.date}
          >
            <option value='1'>1 Tag</option>
            <option value='2'>2 Tage</option>
            <option value='3'>3 Tage</option>
            <option value='4'>4 Tage</option>
            <option value='5'>5 Tage</option>
            <option value='6'>6 Tage</option>
            <option value='7'>7 Tage</option>
          </select>
        </div>
        <div>
          <button onClick={() => console.log(this.state)}>
            Search
          </button>
        </div>
      </div>
    )
  }
}

export default App
