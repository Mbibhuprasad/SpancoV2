import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import Header from "./components/Header";
import Hero from "./components/Hero";
import BikeCollection from "./components/Services";
import Accessories from "./components/Accessories";
import Testimonials from "./components/Testimonials";

import Footer from "./components/Footer";

import Furniture from "./pages/Furniture";

import Login from "./components/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import ProductShowPage from "./pages/ProductShowPage";
import AboutSection from "./components/AboutSection";
import Contact from "./components/Contact";
import CertificationPage from "./components/Certificate";

const HomePage = () => (
  <>
    <Hero />
    <BikeCollection />
    <Accessories />
    <Testimonials />
    <AboutSection />
    <CertificationPage />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/furniture" element={<Furniture />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />

            {/* Updated routes to use the single ProductShowPage */}
            <Route path="/category/:categoryId" element={<ProductShowPage />} />
            <Route
              path="/category/:categoryId/subcategory/:subcategoryId"
              element={<ProductShowPage />}
            />
            <Route
              path="/category/:categoryId/subcategory/:subcategoryId/labcategory/:labCategoryId"
              element={<ProductShowPage />}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
