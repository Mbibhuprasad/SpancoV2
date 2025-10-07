import React from "react";
import { motion } from "framer-motion";

const OurClients = () => {
  const clients = [
    {
      id: 1,
      name: "Nabadwip vidyasagar college ",
      logo: "https://yt3.googleusercontent.com/ytc/AIdro_l7rp474RaIzXytbB5M4B1MvnYPEzehkd8eozuyQnLHXg=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      id: 2,
      name: "Prabhat kumar college",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJFbYFqlsyCMt2huadNi7LkwQsdZtjdZDyNg&s",
    },
    {
      id: 3,
      name: "Lady Brabourne College",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIp3NE-n5Q0XXjuE7mKKT42uxafIn0USMG0g&s",
    },
    {
      id: 4,
      name: "Dinhata college",
      logo: "https://studyjankari.com/images/logo/dcfaf1073b727844baa718d807680d4e.jpg",
    },
    {
      id: 5,
      name: "Shree gopal banerjee college",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAt5irwtSGnjljeNgs8c3dkkVOVG6VZ4bxGg&s",
    },
    {
      id: 6,
      name: "Raghunathpur College",
      logo: "https://assets.allegiance-educare.com/colleges/thumb/250_250_col3588.jpg",
    },
    {
      id: 7,
      name: "Bankura Samilani college",
      logo: "https://career.webindia123.com/career/institutes/aspupload/Uploads/west-bengal/26153/logo.jpg",
    },
    {
      id: 8,
      name: "Gokhle Memorial Girls College",
      logo: "https://upload.wikimedia.org/wikipedia/en/9/92/Gokhale_Memorial_Girls%27_College.gif",
    },
    {
      id: 9,
      name: "Utkal Univercity",
      logo: "https://cdn.imgbin.com/13/15/6/imgbin-utkal-university-of-culture-national-institute-of-science-education-and-research-vani-vihar-university-department-of-teacher-education-udte-teacher-1ZB1FUuYdKf3dPVfZuCxSF235.jpg",
    },
    {
      id: 10,
      name: "Kalinga-Institute-of-Industrial-Technology",
      logo: "https://icon2.cleanpng.com/20180428/lyw/kisspng-kalinga-institute-of-industrial-technology-entranc-5ae4656eb5c3a0.9424063815249176147445.jpg",
    },
  ];
  const clientcert = [
    {
      id: 1,
      name: "Nabadwip vidyasagar college ",
      logo: "https://amickbrown.com/wp-content/uploads/ISO9001-stamp.png",
    },
    {
      id: 2,
      name: "Prabhat kumar college",
      logo: "https://thumbs.dreamstime.com/b/iso-certified-quality-management-system-emblem-golden-badge-representing-medical-devices-industry-standards-regulatory-304515290.jpg",
    },
    {
      id: 3,
      name: "Lady Brabourne College",
      logo: "https://single-market-economy.ec.europa.eu/sites/default/files/styles/oe_theme_small_no_crop/public/2021-10/ce-mark_0.png?itok=j_EdWduB",
    },
    {
      id: 4,
      name: "Dinhata college",
      logo: "https://studyjankari.com/images/logo/dcfaf1073b727844baa718d807680d4e.jpg",
    },
    {
      id: 5,
      name: "Shree gopal banerjee college",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAt5irwtSGnjljeNgs8c3dkkVOVG6VZ4bxGg&s",
    },
    {
      id: 6,
      name: "Raghunathpur College",
      logo: "https://assets.allegiance-educare.com/colleges/thumb/250_250_col3588.jpg",
    },
    {
      id: 7,
      name: "Bankura Samilani college",
      logo: "https://cdn.vectorstock.com/i/1000v/09/59/tested-rubber-stamp-vector-12480959.jpg",
    },
    {
      id: 8,
      name: "Gokhle Memorial Girls College",
      logo: "https://tl.vhv.rs/dpng/s/592-5925913_gem-government-e-marketplace-logo-hd-png-download.png",
    },
    {
      id: 9,
      name: "Utkal Univercity",
      logo: "https://media.licdn.com/dms/image/v2/C5612AQFjCaZVLzKRuA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1605088823110?e=2147483647&v=beta&t=TKbX1TiziC0v32WnNC7EwX_-EXxyNl_76Rh_6_v6ZkM",
    },
    {
      id: 10,
      name: "Kalinga-Institute-of-Industrial-Technology",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDzNc01l6GUc0bYFmTKAvT2ZgV5g4WOUM-g&s",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Our Clients
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Trusted partners in laboratory and scientific solutions.
          </p>
        </div>

        {/* Scrolling Logos with Framer Motion */}
        <div className="overflow-hidden relative mb-8">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            whileHover={{ x: "0%", transition: { duration: 0 } }} // pause on hover
          >
            {clients.concat(clients).map((client, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-40 flex-shrink-0"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-18 object-contain mb-3"
                />
                <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Static row of 11 small logos (not scrolling) */}
        <div className="flex flex-wrap justify-center gap-6">
          {clientcert.slice(0, 11).map((clientcert) => (
            <div
              key={clientcert.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 w-24 h-24 flex items-center justify-center"
            >
              <img
                src={clientcert.logo}
                alt={clientcert.name}
                className="h-24 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;
