// src/components/CustomerSearch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormStyles.css';

function CustomerSearch() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  // <-- ADD THIS STATE TO STORE LAT/LNG -->
  const [locationCoords, setLocationCoords] = useState({ lat: null, lng: null });

  const servicesList = [
    '',
    'Plumbing',
    'Electrician',
    'Carpentry',
    'Painting',
    'Cleaning',
    'Gardening',
    'Appliance Repair'
  ];

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setError('');
    setSuggestions([]);

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Only trigger autocomplete if length > 2
    if (value.length > 2) {
      const timeout = setTimeout(async () => {
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`
          );
          console.log("Suggestions:", res.data);
          // Filter out suggestions without display_name
          const valid = res.data.filter((s) => s.display_name && s.lat && s.lon);
          setSuggestions(valid);
        } catch (err) {
          console.error('Autocomplete error:', err);
        }
      }, 300);  // wait 300ms after user stops typing

      setTypingTimeout(timeout);
    }
  };

  // <-- UPDATE THIS FUNCTION TO ALSO STORE LAT/LNG -->
  const handleSelectSuggestion = (suggestion) => {
    setLocation(suggestion.display_name);
    setLocationCoords({ lat: suggestion.lat, lng: suggestion.lon }); // Save lat/lng
    setSuggestions([]);
  };

  // <-- UPDATE THIS FUNCTION TO SEND LAT/LNG TO BACKEND -->
  const handleSearch = () => {
    if (!service) {
      setError('Please select a service.');
      return;
    }
    if (!location || !locationCoords.lat || !locationCoords.lng) {
      setError('Please select a valid location from suggestions.');
      return;
    }

    setError('');

    // Send lat/lng instead of location string
    axios.get( `${window.API_BASE_URL}/api/searchProvidersByServiceAndLocation`, {
      params: {
        serviceType: service,
        lat: locationCoords.lat,
        lng: locationCoords.lng
      }
    })
      .then((response) => {
        setProviders(response.data);
      })
      .catch((err) => {
        console.error('Search failed:', err);
        alert('Failed to search providers.');
      });
  };

  return (
    <div className="form-container-wrapper"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
      <div className="form-container">
        <div className="form-box">
          <h2>Find Service Providers</h2>

          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          >
            {servicesList.map((svc, idx) => (
              <option key={idx} value={svc}>
                {svc === '' ? '-- Select Service --' : svc}
              </option>
            ))}
          </select>

          <div style={{ position: 'relative', marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={handleLocationChange}
              style={{ padding: '10px', width: '100%' }}
            />
            {suggestions.length > 0 && (
              <ul style={{
                position: 'absolute',
                background: '#fff',
                border: '1px solid #ccc',
                maxHeight: '150px',
                overflowY: 'auto',
                width: '100%',
                zIndex: 10,
                listStyle: 'none',
                padding: 0,
                margin: 0,
                color: '#000'
              }}>
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectSuggestion(s)}
                    style={{
                      padding: '8px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #eee',
                      backgroundColor: '#fff'
                    }}
                  >
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error && <p className="error">{error}</p>}

          <button onClick={handleSearch} style={{ marginTop: '10px' }}>
            Search
          </button>
          <button
            onClick={() => window.history.back()}
            className="back-button"
            style={{ marginTop: '10px' }}
          >
            ⬅ Back
          </button>
        </div>

        {providers.length > 0 && (
          <div className="results-box">
            <h3>Available Providers:</h3>
            <ul>
              {providers.map((provider) => (
                <li key={provider.id}>
                  <strong>{provider.name}</strong> - {provider.contact} - {provider.location}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerSearch;
