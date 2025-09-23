// src/components/ProviderForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ProviderForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    serviceType: '',
    lat: '',
    lng: ''
  });

  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

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

  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setFormData({ ...formData, location: value });

    if (value.length > 2) {
      try {
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
        setSuggestions(res.data);
      } catch (err) {
        console.error('Location autocomplete failed:', err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setFormData({
      ...formData,
      location: suggestion.display_name,
      lat: suggestion.lat,
      lng: suggestion.lon
    });
    setSuggestions([]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.contact ||
      !formData.location ||
      !formData.serviceType ||
      !formData.lat ||
      !formData.lng
    ) {
      setError('Please fill all fields and select a location.');
      return;
    }

    setError('');

    try {
      await axios.post(`${window.API_BASE_URL}/api/registerProvider`, formData);
      alert('Provider registered successfully!');
      setFormData({
        name: '',
        contact: '',
        location: '',
        serviceType: '',
        lat: '',
        lng: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to register provider.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div style={{
        maxWidth: 700,
        margin: 'auto',
        padding: 30,
        background: 'rgba(247, 247, 247, 0.92)',
        borderRadius: 10,
        boxShadow: '0 0 15px rgba(0,0,0,0.2)'
      }}>
        <h2>Register Provider</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label><br />
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div>
            <label>Contact:</label><br />
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>

          <div style={{ position: 'relative' }}>
            <label>Location (start typing...):</label><br />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleLocationChange}
              autoComplete="off"
              required
            />
            {suggestions.length > 0 && (
              <ul style={{
                position: 'absolute',
                background: '#fff',
                border: '1px solid #ccc',
                maxHeight: '150px',
                overflowY: 'auto',
                width: '100%',
                zIndex: 1,
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {suggestions.map((s, idx) => (
                  <li key={idx} onClick={() => handleSelectSuggestion(s)}
                    style={{ padding: 8, cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                    {s.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label>Service Type:</label><br />
            <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
              {servicesList.map((svc, i) => (
                <option key={i} value={svc}>
                  {svc === '' ? '-- Select Service --' : svc}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden lat/lng fields */}
          <input type="hidden" name="lat" value={formData.lat} />
          <input type="hidden" name="lng" value={formData.lng} />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" style={{ marginTop: 12, marginRight: 10 }}>Register</button>
          <button
            type="button"
            onClick={() => window.history.back()}
            style={{ marginTop: 12 }}
          >
            ⬅ Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProviderForm;
