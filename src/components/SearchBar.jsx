// src/SearchBar.js
import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';


// Example list of countries and capitals (you might want to replace this with a real API or a larger dataset)
const countries = [
  { name: 'United States', capital: 'Washington, D.C.' },
  { name: 'Canada', capital: 'Ottawa' },
  { name: 'Mexico', capital: 'Mexico City' },
  // Add more countries here
];

// Get suggestions based on the input value
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  return countries.filter(country =>
    country.name.toLowerCase().includes(inputValue) ||
    country.capital.toLowerCase().includes(inputValue)
  );
};

// Render suggestion item
const renderSuggestion = suggestion => (
  <div className="suggestion-item">
    <strong>{suggestion.name}</strong> - {suggestion.capital}
  </div>
);

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    // Handle suggestion selection
    alert(`Selected country: ${suggestion.name}`);
  };

  const inputProps = {
    placeholder: 'Search for a country or capital...',
    value,
    onChange: (event, { newValue }) => setValue(newValue),
  };

  return (
    <div className="search-bar">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default SearchBar;
