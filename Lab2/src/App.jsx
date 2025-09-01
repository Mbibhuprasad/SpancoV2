import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BikeCollection from "./components/Services";
import Accessories from "./components/Accessories";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

import EngineeringPage from "./pages/EngineeringPage";
import HigherEducationPage from "./pages/HigherEducationPage";
import SchoolPage from "./pages/SchoolPage";
import SkillPage from "./pages/SkillPage";
import Furniture from "./pages/Furniture";

import Login from "./components/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ProductOnLabCategories from "./pages/HigherEducationPage";
import SubcategoryProductsPage from "./pages/SubcategoryProductsPage";

import ProductShowPage from "./pages/ProductShowPage";
import LabCategoryPage from "./pages/LabCategoryPage"; // Add this import

const HomePage = () => (
  <>
    <Hero />
    <BikeCollection />
    <Accessories />
    <Testimonials />
    <Newsletter />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/engineering" element={<EngineeringPage />} />
              <Route
                path="/engineering/:subcategory"
                element={<EngineeringPage />}
              />
              <Route
                path="/higher-education"
                element={<HigherEducationPage />}
              />
              <Route
                path="/higher-education/:subcategory"
                element={<HigherEducationPage />}
              />
              <Route
                path="/ProductOnLabCategories"
                element={<ProductOnLabCategories />}
              />
              <Route
                path="/subcategoryproducts"
                element={<SubcategoryProductsPage />}
              />
              <Route path="/school" element={<SchoolPage />} />
              <Route path="/school/:subcategory" element={<SchoolPage />} />
              <Route path="/skill-development" element={<SkillPage />} />
              <Route
                path="/skill-development/:subcategory"
                element={<SkillPage />}
              />
              <Route path="/furniture" element={<Furniture />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />

              {/* Updated routes to include lab category */}
              <Route
                path="/category/:categoryId/subcategory/:subcategoryId"
                element={<ProductShowPage />}
              />
              <Route
                path="/category/:categoryId/subcategory/:subcategoryId/labcategory/:labCategoryId"
                element={<LabCategoryPage />}
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
