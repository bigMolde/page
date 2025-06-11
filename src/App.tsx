import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Cart from './pages/Cart';
import { CheckoutConfirm, CheckoutComplete } from './pages/Checkout';
import { Login, Register } from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<ProductList />} />
            <Route path="/r/:category" element={<ProductList />} />
            <Route path="/r/:series" element={<ProductList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/new" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/confirm" element={<CheckoutConfirm />} />
            <Route path="/checkout/complete" element={<CheckoutComplete />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;