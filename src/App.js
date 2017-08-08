import React, { Component } from 'react'
import stations from './stations.json'
import Autosuggest from 'react-autosuggest'
import _ from 'lodash'

import './App.css'

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
      destinationValue: '',
      destinationSuggestions: [],
      departure: '',
      destination: '',
      date: '4',
      id: ''
    }

    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.onOriginChange = this.onOriginChange.bind(this)
    this.onDestinationChange = this.onDestinationChange.bind(this)
    this.onOriginSuggestionsFetchRequested = this.onOriginSuggestionsFetchRequested.bind(this)
    this.onDestinationSuggestionsFetchRequested = this.onDestinationSuggestionsFetchRequested.bind(this)
    this.onOriginSuggestionsClearRequested = this.onOriginSuggestionsClearRequested.bind(this)
    this.onDestinationSuggestionsClearRequested = this.onDestinationSuggestionsClearRequested.bind(this)
    this.onOriginSuggestionSelected = this.onOriginSuggestionSelected.bind(this)
    this.onDestinationSuggestionSelected = this.onDestinationSuggestionSelected.bind(this)
  }

  handleChangeDate (event) {
    this.setState({date: event.target.value})
  }

  onOriginChange (event, { newValue }) {
    this.setState({originValue: newValue})
  }

  onDestinationChange (event, { newValue }) {
    this.setState({destinationValue: newValue})
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onOriginSuggestionsFetchRequested ({ value }) {
    this.setState({
      originSuggestions: getSuggestions(value)
    })
  };

  onDestinationSuggestionsFetchRequested ({ value }) {
    this.setState({
      destinationSuggestions: getSuggestions(value)
    })
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onOriginSuggestionsClearRequested () {
    this.setState({
      originSuggestions: []
    })
  };

  onDestinationSuggestionsClearRequested () {
    this.setState({
      destinationSuggestions: []
    })
  };

  onOriginSuggestionSelected (event, { suggestion }) {
    this.setState({
      departure: suggestion.id
    })
  }

  onDestinationSuggestionSelected (event, { suggestion }) {
    this.setState({
      destination: suggestion.id
    })
  }

  render () {
    const { originValue, originSuggestions } = this.state
    const { destinationValue, destinationSuggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const originInputProps = {
      placeholder: 'From',
      value: originValue,
      onChange: this.onOriginChange
    }
    const destinationInputProps = {
      placeholder: 'To',
      value: destinationValue,
      onChange: this.onDestinationChange
    }
    return (
      <div className='App'>
        <div className='App-header'>
          <h1>Cheapest Train Finder App</h1>
        </div>
        <div className='App-intro'>
          <Autosuggest
            suggestions={originSuggestions}
            onSuggestionsFetchRequested={this.onOriginSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onOriginSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={originInputProps}
            onSuggestionSelected={this.onOriginSuggestionSelected}
          />
          <br />
          <Autosuggest
            suggestions={destinationSuggestions}
            onSuggestionsFetchRequested={this.onDestinationSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onDestinationSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={destinationInputProps}
            onSuggestionSelected={this.onDestinationSuggestionSelected}
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
