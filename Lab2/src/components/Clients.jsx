import React from "react";
import { motion } from "framer-motion";

const clients = [
  {
    id: 1,
    name: "Agilent",
    logo: "https://static.cdnlogo.com/logos/a/5/agilent-technologies.svg",
  },
  {
    id: 2,
    name: "Thermo Fisher",
    logo: "https://static.cdnlogo.com/logos/t/25/thermo-fisher-scientific.svg",
  },
  {
    id: 3,
    name: "Shimadzu",
    logo: "https://static.cdnlogo.com/logos/s/6/shimadzu.svg",
  },
  {
    id: 4,
    name: "PerkinElmer",
    logo: "https://static.cdnlogo.com/logos/p/73/perkinelmer-current.svg",
  },
  {
    id: 5,
    name: "Bruker",
    logo: "https://static.cdnlogo.com/logos/b/69/bruker-977.svg",
  },
  {
    id: 6,
    name: "Mettler Toledo",
    logo: "https://static.cdnlogo.com/logos/m/46/mettler-toledo.svg",
  },
  {
    id: 7,
    name: "Beckman Coulter",
    logo: "https://static.cdnlogo.com/logos/b/97/beckman-coulter.svg",
  },
  {
    id: 8,
    name: "Agfa",
    logo: "https://static.cdnlogo.com/logos/a/54/agfa.svg",
  },
  {
    id: 9,
    name: "GE Healthcare Life Sciences",
    logo: "https://static.cdnlogo.com/logos/g/49/ge-healthcare.svg",
  },
  {
    id: 10,
    name: "Waters",
    logo: "https://static.cdnlogo.com/logos/w/15/waters-instruments.svg",
  },
];

function Clients() {
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
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            whileHover={{ x: 0, transition: { duration: 0 } }} // pause on hover
          >
            {clients.concat(clients).map((client, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 w-40 flex-shrink-0"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 object-contain mb-3"
                />
                <span className="text-gray-800 dark:text-gray-200 text-sm font-semibold text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
