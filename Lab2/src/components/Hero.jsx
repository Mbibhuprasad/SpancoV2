import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Zap,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  const labs = [
    {
      id: 1,
      name: "Physics Lab",
      image:
        "https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "Science Blue",
      gradient: "from-[#703233] to-[#ce6567]",
    },
    {
      id: 2,
      name: "Chemistry Lab",
      image:
        "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "Molecular Green",
      gradient: "from-[#9a3b3d] to-[#de8b8c]",
    },
    {
      id: 3,
      name: "Biology Lab",
      image:
        "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "Nature Green",
      gradient: "from-[#9a3b3d] to-[#ebb6b7]",
    },
  ];

  const stats = [
    {
      icon: Zap,
      value: "500+",
      label: "Active Students",
      color: "text-yellow-500",
    },
    {
      icon: Shield,
      value: "50+",
      label: "Lab Equipments",
      color: "text-blue-500",
    },
    {
      icon: Award,
      value: "24/7",
      label: "Lab Support",
      color: "text-green-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % labs.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + labs.length) % labs.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const openVideoModal = () => setShowVideoModal(true);
  const closeVideoModal = () => setShowVideoModal(false);

  const currentLab = labs[currentSlide];

  const fallingContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const fallingWord = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  useEffect(() => {
    setTypingComplete(false);
    const timer = setTimeout(() => setTypingComplete(true), 900);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const words = ["World", "of", "Science"];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const statItem = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const buttonHover = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const buttonTap = {
    scale: 0.95,
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden transition-colors duration-500">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 dark:from-orange-500/10 dark:to-red-500/10 rounded-full blur-3xl animate-pulse"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-400/10 to-teal-400/10 dark:from-green-500/5 dark:to-teal-500/5 rounded-full blur-3xl"
          ></motion.div>
        </div>

        {/* Pattern */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 dark:opacity-10"
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]"
            style={{ backgroundSize: "20px 20px" }}
          ></div>
        </motion.div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* LEFT CONTENT */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div
                variants={fadeIn}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#703233]/10 to-[#973E42]/10 dark:from-[#703233]/20 dark:to-[#973E42]/20 border border-[#703233] dark:border-[#973E42] rounded-full"
              >
                <Zap className="w-4 h-4 text-[#703233] mr-2" />
                <span className="text-sm font-semibold text-[#703233] dark:text-[#973E42]">
                  Premium Science Labs
                </span>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-gray-900 dark:text-white">
                    Explore The
                  </span>
                  <span
                    className={`block bg-gradient-to-r ${currentLab.gradient} bg-clip-text text-transparent`}
                  >
                    <motion.div
                      key={currentSlide}
                      variants={fallingContainer}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-wrap"
                      onAnimationComplete={() => setTypingComplete(true)}
                    >
                      {words.map((word, index) => (
                        <motion.span
                          key={index}
                          variants={fallingWord}
                          className="inline-block mr-2"
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.div>
                  </span>
                </h1>
                <motion.p
                  variants={fadeIn}
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed"
                >
                  Step into our advanced laboratories for Physics, Chemistry,
                  and Biology. Conduct hands-on experiments, learn through
                  discovery, and innovate for the future of science.
                </motion.p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  className={`group bg-gradient-to-r ${currentLab.gradient} text-white px-8 py-4 rounded-xl hover:shadow-2xl flex items-center justify-center space-x-2 font-semibold`}
                >
                  <span>Explore Labs</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                <motion.button
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  onClick={openVideoModal}
                  className="group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center space-x-2 font-semibold"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-3 gap-6 pt-2"
              >
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={statItem}
                      className="text-center group"
                    >
                      <div className="flex justify-center mb-2">
                        <IconComponent
                          className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                        />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* RIGHT IMAGE FULL WIDTH */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center w-full h-full"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="relative overflow-hidden w-full h-[450px]"
                >
                  <img
                    src={currentLab.image}
                    alt={currentLab.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 rounded-2xl overflow-hidden"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-2xl pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold">{currentLab.name}</h3>
                    <p className="opacity-80">{currentLab.color}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* NAV BUTTONS OUTSIDE IMAGE */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="absolute -left-0 top-1/2 -translate-y-1/2 p-4 bg-gray-100 dark:bg-gray-800/90 rounded-full shadow-lg"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="absolute -right-0 top-1/2 -translate-y-1/2 p-4 bg-gray-100 dark:bg-gray-800/90 rounded-full shadow-lg"
              >
                <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* INDICATORS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-6 space-x-3 absolute -bottom-10 w-full"
              >
                {labs.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => {
                      setIsAnimating(true);
                      setCurrentSlide(index);
                      setTimeout(() => setIsAnimating(false), 500);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? `bg-gradient-to-r ${currentLab.gradient} scale-125`
                        : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
       
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeVideoModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition"
              >
                <X className="w-8 h-8" />
              </motion.button>
              <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto max-h-[80vh]"
                  autoPlay
                  muted
                  loop
                >
                  <source src="./public/Lab_Demo.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
