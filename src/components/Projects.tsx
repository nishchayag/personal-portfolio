import React from "react";
import { Timeline } from "./ui/timeline";
import ProjectsButton from "./projectsButton";
import { LinkPreview } from "./ui/link-preview";
import { Github, ExternalLink } from "lucide-react";

function Projects() {
  const projectData = [
    {
      title: "Feedbacker-io",
      content: (
        <div className="text-center text-lg px-10">
          This Project is an anonymous feedback collection tool which helps
          people submit and recieve completely anonymous and honest feedback for
          true and realistic growth, all for free. <br />
          <div className="flex justify-center gap-4 mt-4 mb-4">
            <a
              href="https://github.com/nishchayag/feedbacker.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://feedbacker-io.nishchayag.live"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          </div>
          For detailed breakdown of the project, please check-out the
          &quot;Projects Page&quot; by clicking the button below!
          <br />
          <ProjectsButton />
        </div>
      ),
    },
    {
      title: "Notesify",
      content: (
        <div className="text-center text-lg px-10">
          This is a free note-taking application that allows users to create,
          edit, and delete notes effortlessly. <br />
          <div className="flex justify-center gap-4 mt-4 mb-4">
            <a
              href="https://github.com/nishchayag/notesify"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://notesify.nishchayag.live"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          </div>
          For detailed breakdown of the project, please check-out the
          &quot;Projects Page&quot; by clicking the button below!
          <br />
          <ProjectsButton />
        </div>
      ),
    },

    {
      title: "My Portfolio Website",
      content: (
        <div className=" text-center text-lg px-10 ">
          This refers to the Website you are looking at right now. <br /> This,
          is my personal Portfolio Website, which I created from scratch using
          various technologies in my knowledge, with an effort to give a
          seamless and comfortable experience, while also being pleasing to the
          eye.
          <br />
          <div className="flex justify-center gap-4 mt-4 mb-4">
            <a
              href="https://github.com/nishchayag/personal-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          </div>
          For detailed breakdown of the project, please check-out the
          &quot;Projects Page&quot; by clicking the button below!
          <br />
          <ProjectsButton />
        </div>
      ),
    },
    {
      title: "Freelance Portfolio",
      content: (
        <div className="text-center text-lg">
          This project was a Front-End only website which I made as a freelancer
          for a client I had in 2024, it featured smooth transitions, cool
          animations, and a colourful colour scheme. The website also had a very
          attractive looking design, which was also designed by me.
          <div className="relative w-full cursor-pointer bg-black ">
            <video
              className="w-full object-cover z-[-1] hover:opacity-20 transition-opacity duration-300 ease-in"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/freelance.mp4" type="video/mp4" />
            </video>

            <p className="z-10 text-white text-lg ">
              Functional website with an attractive design
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-4 mb-4">
            <a
              href="https://www.kaizenn.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          </div>
          <br /> For detailed breakdown of the project, please check-out the
          &quot;Projects Page&quot; by clicking the button below!
          <br />
          <ProjectsButton />
        </div>
      ),
    },
  ];
  return (
    <div>
      <h1 className="text-center text-6xl mt-20">My Past Work</h1>
      <div>
        <Timeline data={projectData} />
      </div>
    </div>
  );
}

export default Projects;
