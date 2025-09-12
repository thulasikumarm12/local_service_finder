import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProviderForm from './components/ProviderForm';
import CustomerSearch from './components/CustomerSearch';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/provider" element={<ProviderForm />} />
        <Route path="/customer" element={<CustomerSearch />} />
      </Routes>
    </Router>
  );
}

export default App;

