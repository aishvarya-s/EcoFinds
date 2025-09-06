import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Auth from './pages/Auth';
import ProductFeed from './pages/ProductFeed';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>EcoFinds</h1>
          <nav>
            <Link to="/products">Products</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/products" element={<ProductFeed />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;