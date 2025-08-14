"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-gradient-to-t from-black to-neutral-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Footer Bottom */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nishchay Agarwal
              </h2>
              <p className="text-gray-400 text-sm">Full-Stack Developer</p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>

            {/* Copyright */}
            <motion.div
              className="text-center md:text-right"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Nishchay Agarwal
              </p>
              <p className="text-gray-500 text-xs">
                Built with ❤️ using Next.js & Tailwind CSS
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
