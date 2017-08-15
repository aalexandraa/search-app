import React, { Component } from 'react'
import styled from 'styled-components'
import stations from './stations.json'
import Autosuggest from 'react-autosuggest'
import _ from 'lodash'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import 'react-dates/lib/css/_datepicker.css'
import './App.css'

// Styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  margin: 1em;
  color: palevioletred;
`

const Button = styled.button`
/* Adapt the colours based on primary prop */
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

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
      duration: '4',
      id: '',
      startDate: moment(),
      endDate: moment().add(2, 'weeks')
    }

    this.handleChangeDuration = this.handleChangeDuration.bind(this)
    this.onOriginChange = this.onOriginChange.bind(this)
    this.onDestinationChange = this.onDestinationChange.bind(this)
    this.onOriginSuggestionsFetchRequested = this.onOriginSuggestionsFetchRequested.bind(this)
    this.onDestinationSuggestionsFetchRequested = this.onDestinationSuggestionsFetchRequested.bind(this)
    this.onOriginSuggestionsClearRequested = this.onOriginSuggestionsClearRequested.bind(this)
    this.onDestinationSuggestionsClearRequested = this.onDestinationSuggestionsClearRequested.bind(this)
    this.onOriginSuggestionSelected = this.onOriginSuggestionSelected.bind(this)
    this.onDestinationSuggestionSelected = this.onDestinationSuggestionSelected.bind(this)
  }

  handleChangeDuration (event) {
    this.setState({duration: event.target.value})
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
    const neededOutputProps = {
      duration: this.state.duration,
      departure: this.state.departure,
      destination: this.state.destination,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }

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
          <Title>Cheapest Train Finder App</Title>
        </div>
        <div className='Search'>
          <div className='Stations'>
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
          <div className='Duration-picker'>
            <select
              onChange={this.handleChangeDuration}
              defaultValue={this.state.duration}
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
          <div className='Date-range-picker'>
            <DateRangePicker
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
          </div>
          <div className='Search-button'>
            <Button primary onClick={() => console.log(neededOutputProps)}>
              Search
            </Button>
          </div>
        </div>

      </div>
    )
  }
}

export default App
