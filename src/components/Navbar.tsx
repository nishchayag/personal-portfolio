"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="select-none">
      <div className="flex justify-end p-5 ">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white rounded-lg h-13 w-13 flex justify-center items-center p-10"
        >
          <button
            title="navbar-toggler"
            className="w-10 h-10 flex flex-col justify-center items-end gap-1 z-50"
          >
            <motion.span
              animate={
                isOpen
                  ? {
                      y: [0, 8, 8],
                      rotate: [0, 0, 45],
                    }
                  : {
                      y: [8, 8, 0],
                      rotate: [45, 0, 0],
                    }
              }
              transition={{
                duration: 1,
                times: [0, 0.5, 1],
              }}
              className="w-8 h-1 bg-black"
            />
            <motion.span
              animate={
                isOpen ? { rotate: [0, 0, -45] } : { rotate: [-45, 0, 0] }
              }
              transition={{
                duration: 1,
                times: [0, 0.5, 1],
              }}
              className="w-8 h-1 bg-black"
            />
            <motion.span
              animate={
                isOpen
                  ? { y: [0, -6, -6], opacity: [1, 1, 0] }
                  : { y: [-6, -6, 0], opacity: [0, 0, 1] }
              }
              className="w-6 h-1 bg-black "
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          animate={
            isOpen
              ? {
                  y: [-1000, 100, 0],
                }
              : { y: [0, 100, -1000] }
          }
          transition={{ duration: 0.7 }}
          className=" text-gray-300 p-5 absolute w-full z-10 "
        >
          <div className="bg-white rounded-xl flex flex-col text-7xl p-10 font-semiboldold">
            <Link
              href="/"
              className="hover:text-black transition-colors duration-400 ease-in-out "
            >
              home.
            </Link>
            <Link
              href="/"
              className="hover:text-black transition-colors duration-300"
            >
              skills.
            </Link>
            <Link
              href="/"
              className="hover:text-black transition-colors duration-300"
            >
              projects.
            </Link>
            <Link
              href="/"
              className="hover:text-black transition-colors duration-300"
            >
              experience.
            </Link>
            <Link
              href="/"
              className="hover:text-black transition-colors duration-300"
            >
              about me.
            </Link>

            <div className="flex gap-4 mt-5">
              <a href="" target="_blank">
                <Github className="hover:text-black w-10 h-10" />
              </a>
              <a href="/" target="_blank">
                <Twitter className="hover:text-black w-10 h-10" />
              </a>
              <a href="/" target="_blank">
                <Linkedin className="hover:text-black w-10 h-10" />
              </a>
              <a href="/" target="_blank">
                <Mail className="hover:text-black w-10 h-10" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Navbar;
