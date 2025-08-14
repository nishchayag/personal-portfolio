"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "./ui/link-preview";
import { Github, ExternalLink } from "lucide-react";

function Projects() {
  const [selectedTech, setSelectedTech] = useState("all");

  // Enhanced projects data with correct information and more projects
  const projects = [
    {
      id: 1,
      title: "Feedbacker-io",
      description:
        "An anonymous feedback collection platform that allows users to receive honest feedback without revealing the sender's identity.",
      longDescription:
        "Feedbacker-io enables anonymous feedback collection through shareable links. Users can create feedback forms, share them publicly, and receive honest opinions while maintaining complete anonymity for feedback providers.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "MongoDB",
        "Vercel",
        "Framer Motion",
      ],
      category: "Full-Stack",
      featured: true,
      status: "Live",
      demoUrl: "https://feedbacker-io.nishchayag.live",
      githubUrl: "https://github.com/nishchayag/feedbacker.io",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Anonymous feedback collection",
        "Shareable feedback links",
        "Real-time submissions",
        "Privacy-focused design",
      ],
    },
    {
      id: 2,
      title: "Notesify",
      description:
        "A modern note-taking application with rich text editing, organization features, and cloud synchronization.",
      longDescription:
        "Designed for productivity enthusiasts, Notesify offers a clean interface with powerful features like markdown support, tags, and search functionality for efficient note management.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Vercel"],
      category: "Full-Stack",
      featured: true,
      status: "Live",
      demoUrl: "https://notesify.nishchayag.live",
      githubUrl: "https://github.com/nishchayag/notesify",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Rich text editor",
        "Cloud synchronization",
        "Tag organization",
        "Advanced search",
      ],
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "My personal portfolio website showcasing my skills, projects, and experience as a full-stack developer.",
      longDescription:
        "Built with Next.js and modern design principles, featuring interactive animations, responsive design, and optimized performance to showcase my development journey.",
      techStack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Vercel",
      ],
      category: "Frontend",
      featured: false,
      status: "Live",
      demoUrl: "https://nishchayagarwal.vercel.app",
      githubUrl: "https://github.com/nishchayag/portfolio",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Interactive animations",
        "Responsive design",
        "SEO optimized",
        "Modern UI/UX",
      ],
    },
    {
      id: 4,
      title: "Kaizen Portfolio",
      description:
        "A professional portfolio website designed for a freelance client, showcasing their services and previous work.",
      longDescription:
        "Custom-designed website with focus on user experience, lead generation, and professional presentation of services for a creative freelancer.",
      techStack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      category: "Frontend",
      featured: false,
      status: "Live",
      demoUrl: "https://kaizenn.in",
      githubUrl: null,
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Professional design",
        "Lead generation forms",
        "Service showcase",
        "Mobile responsive",
      ],
    },

    {
      id: 5,
      title: "Currency Converter",
      description:
        "A simple and user-friendly currency converter application built with vanilla JavaScript.",
      longDescription:
        "This currency converter allows users to convert between different currencies with real-time exchange rates. Built with vanilla JavaScript, it features a clean interface and easy-to-use functionality.",
      techStack: ["JavaScript", "HTML", "CSS"],
      category: "Static/API",
      featured: false,
      status: "Live",
      demoUrl: "https://nishchayag.github.io/currency-converter/",
      githubUrl: "https://github.com/nishchayag/currency-converter",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Real-time exchange rates",
        "User-friendly interface",
        "Lightweight and fast",
        "Cross-browser compatibility",
      ],
    },
    {
      id: 6,
      title: "Digital Signature App",
      description: "A web application for creating  digital signatures.",
      longDescription:
        "This app allows users to create and download their digital signatures securely.",
      techStack: ["JavaScript", "HTML", "CSS"],
      category: "Static/API",
      featured: false,
      status: "Live",
      demoUrl: "https://nishchayag.github.io/Digital-Signature-App/",
      githubUrl: "https://github.com/nishchayag/Digital-Signature-App",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Secure signature creation",
        "User-friendly interface",
        "Cross-platform compatibility",
        "Lightweight and fast",
      ],
    },
    {
      id: 7,
      title: "Connect 4",
      description: "A web-based version of the classic Connect 4 game.",
      longDescription:
        "This project is a web-based implementation of the classic Connect 4 game, allowing users to play against each other in real-time.",
      techStack: ["JavaScript", "HTML", "CSS"],
      category: "Static/API",
      featured: false,
      status: "Live",
      demoUrl: "https://nishchayag.github.io/Connect-4/",
      githubUrl: "https://github.com/nishchayag/Connect-4",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Real-time multiplayer",
        "Responsive design",
        "Easy to use",
        "Lightweight and fast",
      ],
    },
    {
      id: 8,
      title: "Random Password Generator",
      description:
        "A simple and secure random password generator built with JavaScript.",
      longDescription:
        "This password generator creates strong, random passwords using a combination of letters, numbers, and symbols. Users can customize the length and complexity of the passwords generated.",
      techStack: ["JavaScript", "HTML", "CSS"],
      category: "Static/API",
      featured: false,
      status: "Live",
      demoUrl: "https://nishchayag.github.io/password-generator/",
      githubUrl: "https://github.com/nishchayag/password-generator",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Customizable password length",
        "Includes letters, numbers, and symbols",
        "User-friendly interface",
        "Lightweight and fast",
      ],
    },
    {
      id: 9,
      title: "Newspaper App",
      description:
        "A simple newspaper app that fetches and displays news articles from an API.",
      longDescription:
        "This newspaper app allows users to browse and read the latest news articles from various sources. It features a clean and intuitive interface, making it easy for users to find and read articles of interest.",
      techStack: ["JavaScript", "HTML", "CSS"],
      category: "Static/API",
      featured: false,
      status: "Live",
      demoUrl: "https://nishchayag.github.io/Newspaper-App/",
      githubUrl: "https://github.com/nishchayag/Newspaper-App",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Fetches news articles from an API",
        "User-friendly interface",
        "Responsive design",
        "Lightweight and fast",
      ],
    },
    {
      id: 10,
      title: "Key Logger",
      description: "A simple key logger application built with JavaScript.",
      longDescription:
        "This key logger app captures and logs keystrokes in real-time. It features a clean interface and allows users to view their typed input.",
      techStack: ["JavaScript", "HTML", "CSS"],
      category: "Static/API",
      featured: false,
      status: "Live",
      demoUrl: "https://nishchayag.github.io/Key-Logger/",
      githubUrl: "https://github.com/nishchayag/Key-Logger",
      imageUrl: "/api/placeholder/600/400",
      keyFeatures: [
        "Real-time keystroke logging",
        "User-friendly interface",
        "Lightweight and fast",
        "Cross-browser compatibility",
      ],
    },
  ];

  // Extract all unique technologies
  const allTechnologies = [
    "all",
    ...new Set(projects.flatMap((project) => project.techStack)),
  ];

  // Filter projects based on selected technology
  const filteredProjects =
    selectedTech === "all"
      ? projects
      : projects.filter((project) => project.techStack.includes(selectedTech));

  const featuredProjects = projects.filter((project) => project.featured);

  // Get tech badge color
  const getTechBadgeColor = (tech: string) => {
    const colors = {
      "Next.js": "bg-black text-white border-gray-600",
      "React.js": "bg-cyan-500/20 text-cyan-400 border-cyan-500",
      TypeScript: "bg-blue-600/20 text-blue-400 border-blue-600",
      JavaScript: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
      "Tailwind CSS": "bg-teal-500/20 text-teal-400 border-teal-500",
      "Node.js": "bg-green-600/20 text-green-400 border-green-600",
      "Express.js": "bg-gray-700/20 text-gray-300 border-gray-700",
      MongoDB: "bg-green-500/20 text-green-400 border-green-500",
      HTML: "bg-orange-500/20 text-orange-400 border-orange-500",
      CSS: "bg-blue-500/20 text-blue-400 border-blue-500",
      "Framer Motion": "bg-pink-500/20 text-pink-400 border-pink-500",
      Vercel: "bg-black/80 text-white border-gray-600",
      "Static/API": "bg-gray-500/20 text-gray-400 border-gray-500",
      "Local Storage": "bg-indigo-500/20 text-indigo-400 border-indigo-500",
    };
    return (
      colors[tech as keyof typeof colors] ||
      "bg-gray-500/20 text-gray-400 border-gray-500"
    );
  };

  return (
    <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 w-full flex flex-col text-2xl pt-20 overflow-hidden">
      <h1 className="text-center text-6xl text-white mb-16">My Projects</h1>

      {/* Featured Projects Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, _index) => (
            <motion.div
              key={project.id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30"></div>
                <div className="relative text-6xl opacity-60">
                  {project.title === "Feedbacker-io" ? "💬" : "📝"}
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      project.status === "Live"
                        ? "bg-green-500/20 text-green-400 border-green-500"
                        : "bg-blue-500/20 text-blue-400 border-blue-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded border border-gray-600">
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  {project.longDescription}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getTechBadgeColor(
                        tech
                      )}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    {project.keyFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-400"
                      >
                        <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.demoUrl && (
                    <LinkPreview url={project.demoUrl} className="flex-1">
                      <p className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-all duration-300 text-sm hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                        <ExternalLink className="w-4 h-4 inline mr-2" />
                        Live Demo
                      </p>
                    </LinkPreview>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-medium text-center transition-all duration-300 text-sm hover:scale-105 hover:shadow-lg hover:shadow-gray-500/25"
                    >
                      <Github className="w-4 h-4 inline mr-2" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technology Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2 bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedTech === tech
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tech === "all" ? "All Projects" : tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          All Projects ({filteredProjects.length})
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded border border-gray-600 flex-shrink-0">
                  {project.category}
                </span>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 rounded text-xs font-medium border ${getTechBadgeColor(
                      tech
                    )}`}
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-600/50 text-gray-300 border border-gray-600">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {project.demoUrl && (
                  <LinkPreview url={project.demoUrl} className="flex-1">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-medium text-center transition-all duration-300 text-xs hover:scale-105"
                    >
                      Demo
                    </a>
                  </LinkPreview>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg font-medium text-center transition-all duration-300 text-xs hover:scale-105"
                  >
                    <Github className="w-3 h-3 inline mr-1" />
                    Code
                  </a>
                )}
                {!project.demoUrl && !project.githubUrl && (
                  <div className="flex-1 bg-gray-800 text-gray-400 py-2 px-3 rounded-lg font-medium text-center text-xs cursor-not-allowed">
                    Private
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Projects Summary */}
      <div className="text-center mb-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Building Digital Solutions
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              From concept to deployment, I create full-stack applications that
              solve real-world problems. Each project showcases different
              aspects of modern web development, from responsive frontends to
              scalable backend architectures.
            </p>
            <div className="flex justify-center gap-8 mt-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {projects.length}
                </div>
                <div className="text-gray-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {allTechnologies.length - 1}
                </div>
                <div className="text-gray-400">Technologies Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {featuredProjects.length}
                </div>
                <div className="text-gray-400">Featured Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
