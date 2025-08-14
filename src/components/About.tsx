"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Coffee,
  Music,
  BookOpen,
  Gamepad2,
  Plane,
  Target,
  Lightbulb,
  Users,
  Zap,
} from "lucide-react";

function About() {
  const interests = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Coding",
      description: "Building solutions with clean, efficient code",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Coffee",
      description: "Fuel for late-night coding sessions",
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Music",
      description: "Background beats while programming",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Learning",
      description: "Always exploring new technologies",
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Gaming",
      description: "Relaxing with strategy and puzzle games",
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Travel",
      description: "Exploring new places and cultures",
    },
  ];

  const stats = [
    { number: "3+", label: "Years Experience" },
    { number: "15+", label: "Projects Completed" },
    { number: "8+", label: "Technologies Mastered" },
    { number: "100%", label: "Dedication" },
  ];

  const values = [
    {
      title: "Clean Code",
      description:
        "I believe in writing code that is not only functional but also readable, maintainable, and efficient.",
    },
    {
      title: "User-Centric",
      description:
        "Every project starts with understanding the user's needs and creating solutions that provide real value.",
    },
    {
      title: "Continuous Learning",
      description:
        "The tech world evolves rapidly, and I'm committed to staying updated with the latest trends and best practices.",
    },
    {
      title: "Collaboration",
      description:
        "Great products are built by great teams. I value open communication and collaborative problem-solving.",
    },
  ];

  const approach = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Problem-Solving",
      description:
        "I approach every challenge with analytical thinking and creative solutions.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description:
        "Always looking for new ways to improve user experience and code efficiency.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Focus",
      description:
        "Building applications that users love and find genuinely useful.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance",
      description:
        "Optimizing for speed, accessibility, and seamless user interactions.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 w-full text-white py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I&apos;m a passionate full-stack developer who loves creating
            digital experiences that make a difference
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Personal Story */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-blue-400">
                My Journey
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  My journey into web development started with curiosity and
                  evolved into a passion for creating meaningful digital
                  experiences. What began as simple HTML pages has grown into
                  building full-stack applications that solve real-world
                  problems.
                </p>
                <p>
                  I specialize in modern web technologies like Next.js, React,
                  and TypeScript, with a strong foundation in both frontend and
                  backend development. I&apos;m particularly drawn to projects
                  that challenge me to think creatively and push the boundaries
                  of what&apos;s possible on the web.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  knowledge with the developer community. I believe that the
                  best way to grow as a developer is to never stop learning and
                  always stay curious.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-purple-400">
                What I Value
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* My Approach */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-green-400">
                My Approach
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {approach.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-green-400 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Stats */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 text-center">
                By The Numbers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-white/5 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 text-center">
                Interests & Hobbies
              </h3>
              <div className="space-y-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.title}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-blue-400">{interest.icon}</div>
                    <div>
                      <h4 className="text-white font-medium text-sm">
                        {interest.title}
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {interest.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current Focus */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-center">
                Currently Learning
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Next.js</span>
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-5/6"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Use + Integration of AI</span>
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-3/5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">AWS</span>
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full w-1/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fun Facts */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Fun Facts About Me</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">☕</div>
                <p className="text-gray-300">Powered by coffee and curiosity</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌙</div>
                <p className="text-gray-300">Night owl developer</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚀</div>
                <p className="text-gray-300">Always ready for new challenges</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
