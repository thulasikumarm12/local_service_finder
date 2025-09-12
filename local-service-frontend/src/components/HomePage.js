import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="overlay">
        <h1>🔧 Local Service Finder</h1>
        <p>Find local plumbers, electricians, and more near you!</p>
        <div className="button-group">
          <button onClick={() => navigate('/customer')}>I am a Customer</button>
          <button onClick={() => navigate('/provider')}>I am a Service Provider</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
