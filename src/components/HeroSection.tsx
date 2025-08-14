import React from "react";
import { TypewriterWithBreaks } from "./ui/type-writer-effect";
import { BackgroundBeamsWithCollision } from "./ui/backgroud-beams-with-collision";

function HeroSection() {
  const typeWords = [
    {
      text: "Hi",
    },
    {
      text: `\nI am Nishchay Agarwal\n`,
    },
    {
      text: "A full-stack web-developer",
    },
  ];

  return (
    <div className="flex flex-wrap h-205">
      <BackgroundBeamsWithCollision extendToFooter={true}>
        <div className="px-5 w-full text-6xl lg:text-7xl md:text-center  gap-y-4 ">
          <TypewriterWithBreaks words={typeWords} className="" />
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}

export default HeroSection;
