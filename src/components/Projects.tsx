import React from "react";
import { Timeline } from "./ui/timeline";
import { cn } from "@/lib/utils";

function Projects() {
  const projectData = [
    {
      title: "My Portfolio Website",
      content: (
        <div className=" text-center text-lg px-10 ">
          This reffers to the Website you are looking at right now. <br /> This,
          is my personal Portfolio Website, which I created from scratch using
          various technologies in my knowledge, with an effort to give a
          seamless and comfortable experience, while also being pleasing to the
          eye.
          <br />
          For detailed breakdown of the project, please check-out the "Projects
          Page" by clicking the button below!
          <br />
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 mt-5 bg-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            Click Me!
          </button>
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
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 mt-5 bg-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            Click Me!
          </button>
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
