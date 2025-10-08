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

import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "../context/ThemeContext";
import TestRideModal from "./Contact";
// import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTestRideModalOpen, setIsTestRideModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [labCategories, setLabCategories] = useState({});

  const location = useLocation();
  const headerRef = useRef(null);

  // FIX: Access environment variables outside fetch functions to avoid 'import.meta' issue
  // Determine if we are running in a mock environment (i.e., VITE_BACKEND_URI is not available)
  const VITE_BACKEND_URI =
    typeof import.meta.env.VITE_BACKEND_URI !== "undefined"
      ? import.meta.env.VITE_BACKEND_URI
      : "";

  const isMock = VITE_BACKEND_URI === "";

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedIn(true);
    }
    // Set initial dark mode class
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Fetch all categories (Mock data if VITE_BACKEND_URI is not set)
  const fetchCategories = () => {
    const mockCategories = [
      { _id: "cat1", name: "Science Kits" },
      { _id: "cat2", name: "Robotics Labs" },
      { _id: "cat3", name: "Math Tools" },
    ];

    if (isMock) {
      setCategories(mockCategories);
      fetchSubcategories("cat1"); // Pre-fetch one category for desktop example
    } else {
      fetch(`${VITE_BACKEND_URI}/categories`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
        })
        .catch((err) => console.error("Error fetching categories:", err));
    }
  };

  // Fetch subcategories when a category is clicked
  const fetchSubcategories = (categoryId) => {
    const mockSubcategories = {
      cat1: [
        { _id: "sub1A", name: "Physics Experiments" },
        { _id: "sub1B", name: "Chemistry Projects" },
      ],
      cat2: [
        { _id: "sub2A", name: "Arduino Kits" },
        { _id: "sub2B", name: "Sensor Modules" },
      ],
      cat3: [{ _id: "sub3A", name: "Geometry Models" }],
    };

    if (isMock) {
      setSubcategories((prev) => ({
        ...prev,
        [categoryId]: mockSubcategories[categoryId] || [],
      }));
      // Mock pre-fetch lab categories for one subcategory
      if (categoryId === "cat1") fetchLabCategories("sub1A");
    } else {
      fetch(`${VITE_BACKEND_URI}/subcategories/category/${categoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setSubcategories((prev) => ({
            ...prev,
            [categoryId]: data,
          }));
        })
        .catch((err) => console.error("Error fetching subcategories:", err));
    }
  };

  // Fetch lab categories when a subcategory is needed
  const fetchLabCategories = (subcategoryId) => {
    const mockLabCategories = {
      sub1A: [
        { _id: "lab1A1", name: "Mechanics Lab" },
        { _id: "lab1A2", name: "Optics Lab" },
      ],
      sub1B: [{ _id: "lab1B1", name: "Titration Kits" }],
      sub2A: [{ _id: "lab2A1", name: "Line Follower" }],
    };

    if (isMock) {
      setLabCategories((prev) => ({
        ...prev,
        [subcategoryId]: mockLabCategories[subcategoryId] || [],
      }));
    } else {
      fetch(`${VITE_BACKEND_URI}/labcategories/subcategory/${subcategoryId}`)
        .then((res) => res.json())
        .then((data) => {
          setLabCategories((prev) => ({
            ...prev,
            [subcategoryId]: data,
          }));
        })
        .catch((err) => console.error("Error fetching lab categories:", err));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // NEW: OUTSIDE CLICK HANDLER
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the click is not on the header/menu, close all
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setIsMenuOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle category click (Toggle subcategories level)
  const handleCategoryClick = (categoryId) => {
    setActiveSubDropdown(null); // Reset lab dropdown when main category changes
    if (activeDropdown === categoryId) {
      setActiveDropdown(null); // close dropdown
    } else {
      setActiveDropdown(categoryId); // open dropdown
      if (!subcategories[categoryId]) {
        fetchSubcategories(categoryId); // fetch only if not already loaded
      }
    }
  };

  // NEW: Handle subcategory click (Toggle lab categories level)
  const handleSubcategoryClick = (subcategoryId) => {
    if (activeSubDropdown === subcategoryId) {
      setActiveSubDropdown(null); // close lab dropdown
    } else {
      setActiveSubDropdown(subcategoryId); // open lab dropdown
      if (!labCategories[subcategoryId]) {
        fetchLabCategories(subcategoryId); // fetch only if not already loaded
      }
    }
  };

  // Keep pre-fetch logic on hover for performance, but display is controlled by click
  const handleSubcategoryMouseEnter = (subcategoryId) => {
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
        ref={headerRef} // Attach the ref here
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

                  {/* Dropdown Menu for subcategories (Level 2) */}
                  <AnimatePresence>
                    {activeDropdown === category._id &&
                      subcategories[category._id] &&
                      subcategories[category._id].length > 0 && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50 origin-top"
                        >
                          {subcategories[category._id].map((subcategory) => (
                            <motion.div
                              key={subcategory._id}
                              className="relative"
                              // Keep pre-fetching for labs on hover
                              onMouseEnter={() =>
                                handleSubcategoryMouseEnter(subcategory._id)
                              }
                              onClick={() =>
                                handleSubcategoryClick(subcategory._id)
                              } // NEW: Click to toggle Lab menu
                            >
                              <div className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 border-b border-gray-100 dark:border-gray-600 last:border-b-0 cursor-pointer">
                                {/* Link must be nested to allow parent div click for toggle */}
                                <Link
                                  to={`/category/${category._id}/subcategory/${subcategory._id}`}
                                  onClick={(e) => {
                                    // Prevent the parent div's onClick (the toggle) from firing when clicking the link text
                                    e.stopPropagation();
                                    setActiveDropdown(null); // Close all menus after link click
                                    setActiveSubDropdown(null);
                                    setIsMenuOpen(false);
                                  }}
                                  className="flex-grow"
                                >
                                  <span>{subcategory.name}</span>
                                </Link>

                                {labCategories[subcategory._id] &&
                                  labCategories[subcategory._id].length > 0 && (
                                    <ChevronDown
                                      className={`w-4 h-4 transition-transform duration-200 ${
                                        activeSubDropdown === subcategory._id
                                          ? "rotate-0" // Up arrow when open
                                          : "rotate-[-90deg]" // Side arrow when closed
                                      }`}
                                    />
                                  )}
                              </div>

                              {/* Lab Categories Menu (Level 3 - Controlled by activeSubDropdown) */}
                              <AnimatePresence>
                                {activeSubDropdown === subcategory._id &&
                                  labCategories[subcategory._id] &&
                                  labCategories[subcategory._id].length > 0 && (
                                    <motion.div
                                      key="lab-menu-desktop"
                                      variants={dropdownVariants} // Reuse variants for smooth appearance
                                      initial="hidden"
                                      animate="visible"
                                      exit="hidden"
                                      className="absolute left-full top-0 ml-1 w-72 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50 origin-top-left"
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
                                              onClick={() => {
                                                setActiveDropdown(null); // Close all menus on navigation
                                                setActiveSubDropdown(null);
                                                setIsMenuOpen(false);
                                              }}
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
                              </AnimatePresence>
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
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsTestRideModalOpen(true)}
                className="hidden md:block bg-gradient-to-r from-[#703233] to-[#973E42] text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
              >
                Contact Us
              </motion.button>

              {/* Mobile theme toggle - Removed from top bar to keep consistency with original code */}
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
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveDropdown(null); // Close on navigation
                        setActiveSubDropdown(null);
                      }}
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
                      className="flex flex-col"
                    >
                      {/* Level 1: Category Link and Toggle Button */}
                      <div className="flex items-center justify-between">
                        <Link
                          to={`/category/${category._id}`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setActiveDropdown(null);
                            setActiveSubDropdown(null);
                          }}
                          className={`flex-grow text-gray-700 dark:text-gray-300 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 font-medium py-2 ${
                            location.pathname === `/category/${category._id}`
                              ? "text-[#703233] dark:text-[#973E42]"
                              : ""
                          }`}
                        >
                          {category.name}
                        </Link>
                        {subcategories[category._id] &&
                          subcategories[category._id].length > 0 && (
                            <button
                              onClick={() => handleCategoryClick(category._id)}
                              className="p-1"
                            >
                              <ChevronDown
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  activeDropdown === category._id
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                          )}
                      </div>

                      {/* Level 2: Subcategories (Opens on Category Click) */}
                      <AnimatePresence>
                        {activeDropdown === category._id &&
                          subcategories[category._id] && (
                            <motion.div
                              key="mobile-sub-menu"
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
                              variants={mobileMenuVariants}
                              className="ml-4 mt-2 space-y-2 overflow-hidden border-l border-gray-300 dark:border-gray-700 pl-4"
                            >
                              {subcategories[category._id].map(
                                (subcategory) => (
                                  <motion.div
                                    key={subcategory._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col"
                                  >
                                    {/* Subcategory Link and Toggle Button */}
                                    <div className="flex items-center justify-between">
                                      <Link
                                        to={`/category/${category._id}/subcategory/${subcategory._id}`}
                                        onClick={() => {
                                          setIsMenuOpen(false);
                                          setActiveDropdown(null);
                                          setActiveSubDropdown(null);
                                        }}
                                        className="flex-grow text-sm text-gray-600 dark:text-gray-400 hover:text-[#703233] dark:hover:text-[#973E42] py-1"
                                      >
                                        {subcategory.name}
                                      </Link>
                                      {labCategories[subcategory._id] &&
                                        labCategories[subcategory._id].length >
                                          0 && (
                                          <button
                                            onClick={() =>
                                              handleSubcategoryClick(
                                                subcategory._id
                                              )
                                            } // NEW: Click to toggle Lab menu
                                            className="p-1"
                                            onMouseEnter={() =>
                                              handleSubcategoryMouseEnter(
                                                subcategory._id
                                              )
                                            } // Pre-fetch data
                                          >
                                            <ChevronDown
                                              className={`w-4 h-4 transition-transform duration-200 ${
                                                activeSubDropdown ===
                                                subcategory._id
                                                  ? "rotate-180"
                                                  : ""
                                              }`}
                                            />
                                          </button>
                                        )}
                                    </div>

                                    {/* Level 3: Lab Categories (Opens on Subcategory Click) */}
                                    <AnimatePresence>
                                      {activeSubDropdown === subcategory._id &&
                                        labCategories[subcategory._id] &&
                                        labCategories[subcategory._id].length >
                                          0 && (
                                          <motion.div
                                            key="mobile-lab-level"
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            variants={mobileMenuVariants} // Reusing mobile variants for smooth slide down
                                            className="ml-4 mt-1 space-y-1 overflow-hidden border-l border-gray-200 dark:border-gray-600 pl-4"
                                          >
                                            {labCategories[subcategory._id].map(
                                              (labCategory) => (
                                                <motion.div
                                                  key={labCategory._id}
                                                  variants={
                                                    mobileMenuItemVariants
                                                  }
                                                >
                                                  <Link
                                                    to={`/category/${category._id}/subcategory/${subcategory._id}/labcategory/${labCategory._id}`}
                                                    onClick={() => {
                                                      setIsMenuOpen(false);
                                                      setActiveDropdown(null);
                                                      setActiveSubDropdown(
                                                        null
                                                      );
                                                    }}
                                                    className="block text-xs text-gray-500 dark:text-gray-500 hover:text-[#703233] dark:hover:text-[#973E42] py-1"
                                                  >
                                                    {labCategory.name}
                                                  </Link>
                                                </motion.div>
                                              )
                                            )}
                                          </motion.div>
                                        )}
                                    </AnimatePresence>
                                  </motion.div>
                                )
                              )}
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  <motion.div variants={mobileMenuItemVariants}>
                    <Link
                      to="/furniture"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveDropdown(null);
                        setActiveSubDropdown(null);
                      }}
                      className={`text-gray-700 dark:text-gray-300 hover:text-[#703233] dark:hover:text-[#973E42] transition-colors duration-200 font-medium py-2 ${
                        location.pathname === "/furniture"
                          ? "text-[#703233] dark:text-[#973E42]"
                          : ""
                      }`}
                    >
                      Furniture
                    </Link>
                  </motion.div>

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
