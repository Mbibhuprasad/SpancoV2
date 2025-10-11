import React from "react";
import { motion } from "framer-motion";

const OurClients = () => {
  const odsclients = [
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
      id: 1,
      name: "University of Delhi  MIRANDA HOUSE ",
      logo: "https://www.mirandahouse.ac.in/images/mhud_logo1.png",
    },
    {
      id: 2,
      name: "Birla Institute Of Technology,Mesra",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Birla_Institute_of_Technology_Mesra.png/250px-Birla_Institute_of_Technology_Mesra.png",
    },
  ];
  const ofdclients = [
    {
      id: 1,
      name: "Indian Institute of Science & Education Research (IISER)",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/IISER-Mohali_Logo.svg/1200px-IISER-Mohali_Logo.svg.png",
    },
    {
      id: 2,
      name: "National Institute Science & Education Research (NISER)",
      logo: "https://upload.wikimedia.org/wikipedia/en/5/54/National_Institute_of_Science_Education_and_Research.svg",
    },
    {
      id: 3,
      name: "Indian Institute of Technology (IIT), Bhubaneswar",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Indian_Institute_of_Technology_Bhubaneswar_Logo.svg/1200px-Indian_Institute_of_Technology_Bhubaneswar_Logo.svg.png",
    },
    {
      id: 4,
      name: "Siksha 'O' Anusandhan University (SOA)",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/c5/Siksha_%E2%80%98O%E2%80%99_Anusandhan.png",
    },
    {
      id: 5,
      name: "Berhampur University",
      logo: "https://upload.wikimedia.org/wikipedia/en/7/74/Berhampur-University_Logo.png",
    },
    {
      id: 6,
      name: "Ravenshaw University",
      logo: "https://upload.wikimedia.org/wikipedia/en/0/09/Ravenshaw_University_Logo.png ",
    },
    {
      id: 7,
      name: "Centurian University",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/62/Centurion_University_of_Technology_and_Management_Logo.svg",
    },
    {
      id: 8,
      name: "Sri Sri University",
      logo: "https://www.srisriuniversity.edu.in/images/logo.png",
    },
    {
      id: 9,
      name: "Veer Surendra Sai University Of Technology (VSSUT)",
      logo: "https://vssut.ac.in/images/logo.png",
    },
    {
      id: 10,
      name: "Sambalpur University Inst. Of Info. Tech (SUIIT)",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Suiit_logo.png",
    },
    {
      id: 11,
      name: "UTKAL UNIVERSITY",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/73/UU_LOGO.png",
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
      name: "Utkal University",
      logo: "https://media.licdn.com/dms/image/v2/C5612AQFjCaZVLzKRuA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1605088823110?e=2147483647&v=beta&t=TKbX1TiziC0v32WnNC7EwX_-EXxyNl_76Rh_6_v6ZkM",
    },
    {
      id: 10,
      name: "Kalinga-Institute-of-Industrial-Technology",
      logo: "https://blog.ipleaders.in/wp-content/uploads/2016/06/make-in-India-logo.jpg",
    },
  ];

  return (
    <section className="py-2  bg-gray-50 dark:bg-gray-900">
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
            {odsclients.concat(odsclients).map((client, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-40 flex-shrink-0"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-[5rem] object-contain mb-3"
                />
                <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* scroll right */}
        <div className="overflow-hidden relative mb-8">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["-50%", "0%"] }} // ✅ now scrolls from left to right
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
            {ofdclients.concat(ofdclients).map((client, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-40 flex-shrink-0"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-[5rem] object-contain mb-3"
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
