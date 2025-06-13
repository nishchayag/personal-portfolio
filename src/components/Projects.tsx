import React from "react";
import { Timeline } from "./ui/timeline";
import { cn } from "@/lib/utils";
import ProjectsButton from "./projectsButton";
import { LinkPreview } from "./ui/link-preview";

function Projects() {
  const projectData = [
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
          For detailed breakdown of the project, please check-out the "Projects
          Page" by clicking the button below!
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
          <br /> For detailed breakdown of the project, please check-out the
          "Projects Page" by clicking the button below!
          <br />
          <ProjectsButton />
        </div>
      ),
    },
    {
      title: "Connect 4",
      content: (
        <div className="text-center text-lg">
          This Connect 4 game project, which I have made completely in Vanilla
          JavaScript, showcases my problem solving skills, and my ability to
          think and imagine what the solution may be for a particular problem.
          If you are unfamiliar with the game of Connect 4, I suggest you to{" "}
          <LinkPreview
            url="https://officialgamerules.org/game-rules/connect-4/"
            className=" bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold"
          >
            Click Here
          </LinkPreview>{" "}
          to get a gist of what the game is about, so you can understand the
          thought process and logic behind the project.
          <br /> For detailed breakdown of the project, please check-out the
          "Projects Page" by clicking the button below!
          <br />
          <ProjectsButton />
        </div>
      ),
    },
    {
      title: "Password Generator",
      content: (
        <div className="text-center text-lg">
          This Password Generator App, is created by me using react and a
          various react hooks, and some custom hooks as well. This project
          showcases my knowledge and ability to use and create hooks in React
          efficiently.
          <br /> For detailed breakdown of the project, please check-out the
          "Projects Page" by clicking the button below!
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
