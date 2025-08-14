"use client";
import React, { useState } from "react";
import { FloatingDock } from "./ui/floating-dock";

function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Enhanced skills data with categories
  const skills = [
    {
      name: "Next.js",
      level: "Expert",
      years: "2+",
      percentage: 90,
      color: "from-blue-500 to-cyan-500",
      description: "Full-stack React framework with SSR/SSG",
      category: "frontend",
    },
    {
      name: "React.js",
      level: "Expert",
      years: "3+",
      percentage: 95,
      color: "from-cyan-400 to-blue-500",
      description: "Component-based UI library with hooks",
      category: "frontend",
    },
    {
      name: "TypeScript",
      level: "Advanced",
      years: "2+",
      percentage: 85,
      color: "from-blue-600 to-indigo-600",
      description: "Type-safe JavaScript for better development",
      category: "language",
    },
    {
      name: "JavaScript",
      level: "Expert",
      years: "3+",
      percentage: 95,
      color: "from-yellow-400 to-orange-500",
      description: "Core language for web development",
      category: "language",
    },
    {
      name: "Tailwind CSS",
      level: "Advanced",
      years: "2+",
      percentage: 90,
      color: "from-teal-400 to-cyan-500",
      description: "Utility-first CSS framework",
      category: "frontend",
    },
    {
      name: "Node.js",
      level: "Advanced",
      years: "2+",
      percentage: 85,
      color: "from-green-500 to-emerald-600",
      description: "JavaScript runtime for backend development",
      category: "backend",
    },
    {
      name: "Express.js",
      level: "Advanced",
      years: "2+",
      percentage: 85,
      color: "from-gray-600 to-gray-800",
      description: "Minimal web framework for Node.js",
      category: "backend",
    },
    {
      name: "MongoDB",
      level: "Advanced",
      years: "2+",
      percentage: 80,
      color: "from-green-600 to-green-800",
      description: "NoSQL database for modern applications",
      category: "backend",
    },
    {
      name: "Git",
      level: "Advanced",
      years: "3+",
      percentage: 85,
      color: "from-orange-500 to-red-500",
      description: "Version control system for tracking code changes",
      category: "tools",
    },
    {
      name: "Vercel",
      level: "Expert",
      years: "2+",
      percentage: 90,
      color: "from-black to-gray-700",
      description: "Deployment and hosting platform",
      category: "tools",
    },
    {
      name: "Figma",
      level: "Intermediate",
      years: "1+",
      percentage: 75,
      color: "from-purple-500 to-pink-500",
      description: "UI/UX design and prototyping tool",
      category: "tools",
    },
  ];

  // Enhanced dock items with categories and descriptions
  const dockItems = [
    {
      title: "Next.js",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-nextjs"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993" />
          <path d="M15 12v-3" />
        </svg>
      ),
      href: "https://nextjs.org/",
      category: "frontend",
      level: "Expert",
      years: "2+",
      description: "Full-stack React framework with SSR/SSG capabilities",
    },
    {
      title: "React.js",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-react"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6.306 8.711c-2.602 .723 -4.306 1.926 -4.306 3.289c0 2.21 4.477 4 10 4c.773 0 1.526 -.035 2.248 -.102" />
          <path d="M17.692 15.289c2.603 -.722 4.308 -1.926 4.308 -3.289c0 -2.21 -4.477 -4 -10 -4c-.773 0 -1.526 .035 -2.25 .102" />
          <path d="M6.305 15.287c-.676 2.615 -.485 4.693 .695 5.373c1.913 1.105 5.703 -1.877 8.464 -6.66c.387 -.67 .733 -1.339 1.036 -2" />
          <path d="M17.694 8.716c.677 -2.616 .487 -4.696 -.694 -5.376c-1.913 -1.105 -5.703 1.877 -8.464 6.66c-.387 .67 -.733 1.34 -1.037 2" />
          <path d="M12 5.424c-1.925 -1.892 -3.82 -2.766 -5 -2.084c-1.913 1.104 -1.226 5.877 1.536 10.66c.386 .67 .793 1.304 1.212 1.896" />
          <path d="M12 18.574c1.926 1.893 3.821 2.768 5 2.086c1.913 -1.104 1.226 -5.877 -1.536 -10.66c-.375 -.65 -.78 -1.283 -1.212 -1.897" />
          <path d="M11.5 12.866a1 1 0 1 0 1 -1.732a1 1 0 0 0 -1 1.732z" />
        </svg>
      ),
      href: "https://react.dev/",
      category: "frontend",
      level: "Expert",
      years: "3+",
      description: "Component-based UI library with hooks and state management",
    },
    {
      title: "TypeScript",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-typescript"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 17.5c.32 .32 .754 .5 1.207 .5h.543c.69 0 1.25 -.56 1.25 -1.25v-.25a1.5 1.5 0 0 0 -1.5 -1.5a1.5 1.5 0 0 1 -1.5 -1.5v-.25c0 -.69 .56 -1.25 1.25 -1.25h.543c.453 0 .887 .18 1.207 .5" />
          <path d="M9 12h4" />
          <path d="M11 12v6" />
          <path d="M21 19v-14a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2z" />
        </svg>
      ),
      href: "https://www.typescriptlang.org/",
      category: "language",
      level: "Advanced",
      years: "2+",
      description: "Type-safe JavaScript for better development experience",
    },
    {
      title: "JavaScript",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-javascript"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
          <path d="M7.5 8h3v8l-2 -1" />
          <path d="M16.5 8h-2.5a .5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5" />
        </svg>
      ),
      href: "https://javascript.info/",
      category: "language",
      level: "Expert",
      years: "3+",
      description: "Core programming language for web development",
    },
    {
      title: "Tailwind CSS",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brand-tailwind"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M11.667 6c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 2 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968zm-4 6.5c-2.49 0 -4.044 1.222 -4.667 3.667c.933 -1.223 2.023 -1.68 3.267 -1.375c.71 .174 1.217 .68 1.778 1.24c.916 .912 1.975 1.968 4.288 1.968c2.49 0 4.044 -1.222 4.667 -3.667c-.933 1.223 -2.023 1.68 -3.267 1.375c-.71 -.174 -1.217 -.68 -1.778 -1.24c-.916 -.912 -1.975 -1.968 -4.288 -1.968z" />
        </svg>
      ),
      href: "https://tailwindcss.com/",
      category: "frontend",
      level: "Advanced",
      years: "2+",
      description: "Utility-first CSS framework for rapid UI development",
    },
    {
      title: "Node.js",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6.5v11M6.5 12h11" />
        </svg>
      ),
      href: "https://nodejs.org/",
      category: "backend",
      level: "Advanced",
      years: "2+",
      description: "JavaScript runtime for server-side development",
    },
    {
      title: "MongoDB",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M2 12h20" />
        </svg>
      ),
      href: "https://mongodb.com/",
      category: "backend",
      level: "Advanced",
      years: "2+",
      description: "NoSQL database for modern applications",
    },
    {
      title: "Git",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: "https://git-scm.com/",
      category: "tools",
      level: "Advanced",
      years: "3+",
      description: "Version control system for tracking code changes",
    },
  ];

  // Category definitions
  const categories = [
    { id: "all", name: "All Skills", count: skills.length },
    {
      id: "frontend",
      name: "Frontend",
      count: skills.filter((skill) => skill.category === "frontend").length,
    },
    {
      id: "backend",
      name: "Backend",
      count: skills.filter((skill) => skill.category === "backend").length,
    },
    {
      id: "language",
      name: "Languages",
      count: skills.filter((skill) => skill.category === "language").length,
    },
    {
      id: "tools",
      name: "Tools",
      count: skills.filter((skill) => skill.category === "tools").length,
    },
  ];

  // Filter functions
  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === selectedCategory);

  const filteredDockItems =
    selectedCategory === "all"
      ? dockItems
      : dockItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 w-full flex flex-col gap-15 text-2xl pt-20 overflow-hidden">
      <h1 className="text-center text-6xl text-white mb-8">What I know</h1>

      {/* Category Filter Pills */}
      <div className="flex justify-center ">
        <div className="flex flex-wrap gap-3 bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Skills Cards */}
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Skill Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    {skill.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{skill.years}</span>
                    <span
                      className={`text-sm font-medium bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                    >
                      {skill.level}
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Proficiency</span>
                    <span className="text-sm font-medium text-white">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out transform origin-left`}
                      style={{
                        width:
                          hoveredSkill === skill.name
                            ? `${skill.percentage}%`
                            : "0%",
                        transitionDelay:
                          hoveredSkill === skill.name ? "200ms" : "0ms",
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    hoveredSkill === skill.name
                      ? "max-h-20 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Animated Border */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Floating Dock */}
      <div className="flex flex-col items-center">
        <h2 className="text-center text-3xl text-white mb-10">Quick Access</h2>
        <div className="mb-8">
          <div className="transform scale-125 md:scale-150">
            <FloatingDock items={filteredDockItems} />
          </div>
        </div>
      </div>

      {/* Skills Summary */}
      <div className="text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Full-Stack Developer
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Passionate about creating modern web experiences with the latest
              technologies. Proficient in both frontend and backend development,
              with a focus on performance, accessibility, and user experience.
            </p>
            <div className="flex justify-center gap-8 mt-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">3+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {skills.length}
                </div>
                <div className="text-gray-400">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">10+</div>
                <div className="text-gray-400">Projects Built</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsSection;
