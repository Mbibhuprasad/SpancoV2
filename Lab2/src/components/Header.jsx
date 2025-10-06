import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Moon,
  Sun,
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import TestRideModal from "./Contact";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTestRideModalOpen, setIsTestRideModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [labCategories, setLabCategories] = useState({});
  const location = useLocation();
  const dropdownTimeoutRef = useRef(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch all categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URI}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  };

  // Fetch subcategories when a category is clicked
  const fetchSubcategories = (categoryId) => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URI}/subcategories/category/${categoryId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSubcategories((prev) => ({
          ...prev,
          [categoryId]: data,
        }));
      })
      .catch((err) => console.error("Error fetching subcategories:", err));
  };

  // Fetch lab categories when a subcategory is hovered
  const fetchLabCategories = (subcategoryId) => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URI
      }/labcategories/subcategory/${subcategoryId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLabCategories((prev) => ({
          ...prev,
          [subcategoryId]: data,
        }));
      })
      .catch((err) => console.error("Error fetching lab categories:", err));
  };

  // NEW: Handle category click instead of hover
  const handleCategoryClick = (categoryId) => {
    if (activeDropdown === categoryId) {
      setActiveDropdown(null); // close dropdown
    } else {
      setActiveDropdown(categoryId); // open dropdown
      if (!subcategories[categoryId]) {
        fetchSubcategories(categoryId); // fetch only if not already loaded
      }
    }
  };

  const handleSubcategoryMouseEnter = (subcategoryId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    // Fetch lab categories for this subcategory if not already loaded
    if (subcategoryId && !labCategories[subcategoryId]) {
      fetchLabCategories(subcategoryId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg sticky top-0 z-40 transition-all duration-300"
      >
        <div className="">
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-[#703233] to-[#973E42] hidden md:flex justify-between items-center py-3 px-10 text-sm border-b border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <Phone className="w-4 h-4 text-white" />
                <span className="text-white dark:text-gray-300">
                  +91 9338273911
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <Mail className="w-4 h-4 text-white" />
                <span className="text-white dark:text-gray-300">
                  spancotek@gmail.com
                </span>
              </motion.div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-white" />
              ) : (
                <Moon className="w-4 h-4 text-white" />
              )}
            </motion.button>
          </motion.div>

          {/* Main header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-between items-center py-4 px-10"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-2 "
            >
              <Link to="/">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  className="max-w-[180px] md:max-w-[220px] h-auto object-contain"
                  alt="Logo spancotek"
                  src="/spanco-tek.png"
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <motion.div variants={itemVariants}>
                <Link
                  to="/"
                  className={`text-gray-700 dark:text-gray-300 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 font-medium ${
                    location.pathname === "/"
                      ? "text-[#703233] dark:text-[#973E42]"
                      : ""
                  }`}
                >
                  <motion.span whileHover={{ scale: 1.05 }} className="block">
                    Home
                  </motion.span>
                </Link>
              </motion.div>

              {categories.map((category) => (
                <motion.div
                  key={category._id}
                  variants={itemVariants}
                  className="relative"
                >
                  <button
                    onClick={() => handleCategoryClick(category._id)}
                    className={`flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 font-medium ${
                      location.pathname === `/category/${category._id}`
                        ? "text-[#703233] dark:text-[#973E42]"
                        : ""
                    }`}
                  >
                    <motion.span whileHover={{ scale: 1.05 }}>
                      {category.name}
                    </motion.span>
                    {subcategories[category._id] &&
                      subcategories[category._id].length > 0 && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === category._id ? "rotate-180" : ""
                          }`}
                        />
                      )}
                  </button>

                  {/* Dropdown Menu for subcategories */}
                  <AnimatePresence>
                    {activeDropdown === category._id &&
                      subcategories[category._id] &&
                      subcategories[category._id].length > 0 && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50"
                        >
                          {subcategories[category._id].map((subcategory) => (
                            <motion.div
                              key={subcategory._id}
                              className="relative group"
                              onMouseEnter={() =>
                                handleSubcategoryMouseEnter(subcategory._id)
                              }
                              whileHover={{ scale: 1.02 }}
                            >
                              <Link
                                to={`/category/${category._id}/subcategory/${subcategory._id}`}
                                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                              >
                                <div className="flex items-center justify-between">
                                  <span>{subcategory.name}</span>
                                  {labCategories[subcategory._id] &&
                                    labCategories[subcategory._id].length >
                                      0 && (
                                      <ChevronDown className="w-4 h-4 transform rotate-[-90deg]" />
                                    )}
                                </div>
                              </Link>

                              {/* Lab Categories for subcategories */}
                              {labCategories[subcategory._id] &&
                                labCategories[subcategory._id].length > 0 && (
                                  <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    className="absolute left-full top-0 ml-1 w-72 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                                  >
                                    <div className="p-2">
                                      <h4 className="font-semibold text-[#703233] dark:text-[#973E42] px-2 py-1 text-sm border-b border-gray-200 dark:border-gray-600 mb-2">
                                        {subcategory.name} Labs
                                      </h4>
                                      {labCategories[subcategory._id].map(
                                        (labCategory) => (
                                          <Link
                                            key={labCategory._id}
                                            to={`/category/${category._id}/subcategory/${subcategory._id}/labcategory/${labCategory._id}`}
                                            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 rounded"
                                          >
                                            <motion.span
                                              whileHover={{ x: 5 }}
                                              className="block"
                                            >
                                              {labCategory.name}
                                            </motion.span>
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div variants={itemVariants}>
                <Link
                  to="/furniture"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-gray-700 dark:text-gray-300 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 font-medium py-2 ${
                    location.pathname === "/furniture"
                      ? "text-[#703233] dark:text-[#973E42]"
                      : ""
                  }`}
                >
                  <motion.span whileHover={{ scale: 1.05 }} className="block">
                    Furniture
                  </motion.span>
                </Link>
              </motion.div>
            </nav>

            <div className="flex items-center space-x-4">
              {/* {isLoggedIn ? (
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="hidden md:flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </motion.button>
              ) : (
                <motion.div variants={itemVariants}>
                  <Link
                    to="/login"
                    className="hidden md:block bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 font-medium text-sm"
                  >
                    <motion.span whileHover={{ scale: 1.05 }} className="block">
                      Login
                    </motion.span>
                  </Link>
                </motion.div>
              )} */}

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTestRideModalOpen(true)}
                className="hidden md:block bg-gradient-to-r from-[#703233] to-[#973E42] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
              >
                Contact Us
              </motion.button>

              {/* Mobile theme toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <motion.nav
                  variants={containerVariants}
                  className="flex flex-col space-y-4 px-10"
                >
                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-gray-700 dark:text-gray-300 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 font-medium py-2 ${
                        location.pathname === "/"
                          ? "text-[#703233] dark:text-[#973E42]"
                          : ""
                      }`}
                    >
                      Home
                    </Link>
                  </motion.div>

                  {categories.map((category) => (
                    <motion.div
                      key={category._id}
                      variants={mobileMenuItemVariants}
                    >
                      <Link
                        to={`/category/${category._id}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-gray-700 dark:text-gray-300 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 font-medium py-2 ${
                          location.pathname === `/category/${category._id}`
                            ? "text-[#703233] dark:text-[#973E42]"
                            : ""
                        }`}
                      >
                        {category.name}
                      </Link>

                      {/* Mobile subcategories */}
                      {subcategories[category._id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 mt-2 space-y-2"
                        >
                          {subcategories[category._id].map((subcategory) => (
                            <motion.div
                              key={subcategory._id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              <Link
                                to={`/category/${category._id}/subcategory/${subcategory._id}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-sm text-gray-600 dark:text-gray-400 hover:text-[#703233] dark:hover:text-[#973E42] py-1"
                              >
                                {subcategory.name}
                              </Link>

                              {/* Mobile lab categories */}
                              {labCategories[subcategory._id] &&
                                labCategories[subcategory._id].length > 0 && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    transition={{ duration: 0.3 }}
                                    className="ml-4 mt-1 space-y-1"
                                  >
                                    {labCategories[subcategory._id].map(
                                      (labCategory) => (
                                        <motion.div
                                          key={labCategory._id}
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 0.2 }}
                                        >
                                          <Link
                                            to={`/category/${category._id}/subcategory/${subcategory._id}/labcategory/${labCategory._id}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-xs text-gray-500 dark:text-gray-500 hover:text-[#703233] dark:hover:text-[#973E42] py-1"
                                          >
                                            {labCategory.name}
                                          </Link>
                                        </motion.div>
                                      )
                                    )}
                                  </motion.div>
                                )}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to="/furniture"
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-gray-700 dark:text-gray-300 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 font-medium py-2 ${
                        location.pathname === "/furniture"
                          ? "text-[#703233] dark:text-[#973E42]"
                          : ""
                      }`}
                    >
                      Furniture
                    </Link>
                  </motion.div>

                  {/* Mobile login/logout button */}
                  {/* {isLoggedIn ? (
                    <motion.button
                      variants={mobileMenuItemVariants}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium mt-4"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </motion.button>
                  ) : (
                    <motion.div variants={mobileMenuItemVariants}>
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="bg-gray-800 dark:bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 font-medium text-center mt-4 block"
                      >
                        Login
                      </Link>
                    </motion.div>
                  )} */}

                  <motion.button
                    variants={mobileMenuItemVariants}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsTestRideModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-[#703233] to-[#973E42] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium mt-4"
                  >
                    Contact Us
                  </motion.button>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <TestRideModal
        isOpen={isTestRideModalOpen}
        onClose={() => setIsTestRideModalOpen(false)}
      />
    </>
  );
};

export default Header;
