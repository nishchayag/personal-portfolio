import React from "react";
import { TypewriterWithBreaks } from "./ui/type-writer-effect";
import { BackgroundBeamsWithCollision } from "./ui/backgroud-beams-with-collision";

function HeroSection() {
  const typeWords = [
    {
      text: "Hi",
    },
    {
      text: `\nI am nishchay agarwal\n`,
    },
    {
      text: "A full-stack web-developer",
    },
  ];

  return (
    <div className="flex flex-wrap h-205">
      <BackgroundBeamsWithCollision>
        <div className="lg:pl-40 px-5 w-full text-6xl flex flex-col gap-y-4 lg:w-1/2">
          <TypewriterWithBreaks words={typeWords} />
        </div>
        <div className="flex justify-center items-center w-full lg:w-1/2 ">
          {" "}
          photo
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

export default HeroSection;
