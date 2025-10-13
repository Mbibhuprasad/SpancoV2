import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Contrast,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const links = [
    { name: "Home", path: "/" },
    {
      name: "Engineering",
      path: "/category/685654c724fcdf9bc9956bfa/subcategory/689585ae3e5961e536578f14",
    },
    {
      name: "Physics",
      path: "/category/685654c724fcdf9bc9956bfb/subcategory/68565b29eacf08bd2d2e3c96",
    },
    {
      name: "School",
      path: "/category/685654c724fcdf9bc9956bfc/subcategory/68b40c1920a594d2c7d8ebed",
    },
    {
      name: "Heating And Cooling",
      path: "/category/685654c724fcdf9bc9956bfb/subcategory/68b408a720a594d2c7d8ebe8/labcategory/68b5406e01a72c7e60be31b1",
    },
  ];

  const categories = [
    "Laboratory Instruments",
    "Glassware",
    "Chemicals & Reagents",
    "Microscopes",
    "Safety Equipment",
    "Medical Devices",
  ];
  const services = [
    "Engineering",
    "Higher Education",
    "Biotechnology",
    "School",
    "Skill Development",
    "Lab Furniture",
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { y: 10, opacity: 0 },
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

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 dark:bg-black text-white transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.img
              whileHover={{ scale: 1.05 }}
              className="max-w-[180px] md:max-w-[220px] h-auto object-contain"
              alt="Logo spancotek"
              src="/logo  spancotek.png"
            />
            <motion.p
              whileHover={{ x: 5 }}
              className="text-gray-400 leading-relaxed"
            >
              Your trusted partner for premium motorcycles and exceptional
              riding experiences. Quality, performance, and customer
              satisfaction guaranteed.
            </motion.p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-[#703233] transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-[#973E42] transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-[#973E42] transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="p-2 bg-gray-800 rounded-lg hover:bg-[#973E42] transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <motion.ul
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {links.map((link, index) => (
                <motion.li key={link.path} variants={childVariants}>
                  <motion.a
                    whileHover={{ x: 5, color: "#973E42" }}
                    href={link.path}
                    className="text-gray-400 hover:text-[#973E42] transition-colors duration-200 block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <motion.div
                variants={childVariants}
                className="flex items-center space-x-3"
              >
                <Phone className="w-5 h-5 text-[#703233]" />
                <span className="text-gray-400">+91 9338273911</span>
              </motion.div>
              <motion.div
                variants={childVariants}
                className="flex items-center space-x-3"
              >
                <Mail className="w-5 h-5 text-[#703233]" />
                <span className="text-gray-400">spancotek@gmail.com</span>
              </motion.div>
              <motion.div
                variants={childVariants}
                className="flex items-start space-x-3"
              >
                <MapPin className="w-5 h-5 text-[#703233] mt-1" />
                <span className="text-gray-400">
                  Sailshree Vihar, Patia.
                  <br />
                  Spancotek Pvt Ltd, Bhubaneswar, Odisha - 751024
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <motion.p whileHover={{ scale: 1.02 }} className="text-gray-400">
            © 2025 Spancotek. All rights reserved.
          </motion.p>
          {/* <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p whileHover={{ scale: 1.02 }} className="text-gray-400">
              © 2025 Spancotek. All rights reserved.
            </motion.p>
            <div className="flex space-x-6">
              <motion.a
                whileHover={{ scale: 1.1, color: "#973E42" }}
                href="#"
                className="text-gray-400 hover:text-[#973E42] transition-colors duration-200"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, color: "#973E42" }}
                href="#"
                className="text-gray-400 hover:text-[#973E42] transition-colors duration-200"
              >
                Terms of Service
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, color: "#973E42" }}
                href="#"
                className="text-gray-400 hover:text-[#973E42] transition-colors duration-200"
              >
                Cookie Policy
              </motion.a>
            </div>
          </div> */}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
