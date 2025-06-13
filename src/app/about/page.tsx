import React from "react";
import { Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { BackgroundLines } from "@/components/ui/backgroundLines";
function page() {
  return (
    <div className="mt-20 mb-10 ">
      {/* <LampDemo /> */}
      <BackgroundLines>
        <h1 className="text-7xl text-center select-none">About me</h1>
        <div className="px-8 text-xl mt-10 text-center select-none ">
          Hey there! I’m Nishchay Agarwal, a Full-Stack Developer with a strong
          focus on building performant, modern web applications using the MERN
          stack and Next.js. I enjoy crafting seamless user experiences while
          keeping the codebase clean, modular, and scalable. My journey into web
          development started out of pure curiosity — wanting to understand how
          the apps I used every day actually worked. That curiosity quickly
          turned into a passion, and now I find myself spending hours building,
          debugging, learning, and refining projects that I genuinely care
          about. I’ve worked on real-world applications both independently and
          through a few freelance projects, and I’m now actively looking for
          internship opportunities where I can contribute, learn from
          experienced teams, and sharpen my skills in a professional setting. My
          core stack includes MongoDB, Express, React, Node.js, and Next.js. I’m
          comfortable building end-to-end solutions — from setting up APIs and
          databases to creating dynamic frontends with a strong focus on
          performance and responsiveness. Beyond the code, I’m someone who
          values clarity, consistency, and learning by doing. I love exploring
          the latest in web tech, improving my development workflow, and
          thinking about how small UX details can make a big impact. When I’m
          not coding, I’m probably watching tech podcasts, playing video games,
          or just diving into something new that helps me grow — whether it’s a
          tool, a tutorial, or a topic outside tech entirely. I’m always open to
          connecting with like-minded people and collaborating on exciting
          projects. If you’re looking for someone who’s curious, committed, and
          eager to contribute — I’d love to hear from you!
        </div>
        <div className="flex flex-col items-center z-40">
          <div className="flex justify-center gap-4 my-10 bg-white text-gray-300  w-fit px-4 py-2 rounded-md z-40">
            <a href="https://github.com/nishchayag" target="_blank">
              <Github className="hover:text-black w-10 h-10" />
            </a>

            <a
              href="https://www.linkedin.com/in/nishchay-agarwal/"
              target="_blank"
            >
              <Linkedin className="hover:text-black w-10 h-10" />
            </a>
          </div>
          <div className="text-xl text-center flex flex-col gap-4  ">
            <div className="z-40">Phone: +91 9351325580 </div>
            <div className="z-40">Email: nishchay.agar@gmail.com</div>
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
}

export default page;
