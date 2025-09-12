// src/components/LocationSearch.js
import React, { useState } from 'react';

function LocationSearch({ onLocationSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const searchLocations = async (q) => {
    if (!q) {
      setSuggestions([]);
      return;
    }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=5`
    );
    const data = await res.json();
    setSuggestions(data);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    searchLocations(e.target.value);
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    onLocationSelect({
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      display_name: place.display_name,
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Enter location"
        value={query}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px' }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            zIndex: 1000,
            background: 'white',
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            width: '100%',
            maxHeight: '150px',
            overflowY: 'auto',
            border: '1px solid #ccc',
          }}
        >
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationSearch;
