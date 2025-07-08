import React, { FC } from "react";

const Nav: FC = () => (
  <div className="flex shrink-0 gap-20">
    <div className="flex flex-col gap-2">
      <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
      <p>Home</p>
      <p>Projects</p>
      <p>Our Mission</p>
      <p>Contact Us</p>
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="mb-2 uppercase text-[#ffffff80]">Education</h3>
      <p>News</p>
      <p>Learn</p>
      <p>Certification</p>
      <p>Publications</p>
    </div>
  </div>
);

const Section2: FC = () => (
  <div className="flex justify-between items-end">
    <h1 className="text-[11vw] leading-[0.8] mt-10">UTOPIA PONTOISE</h1>
    <p>©copyright</p>
  </div>
);

const Content: FC = () => (
  <div className="bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between">
    <div>
      <Nav />
    </div>
    <Section2 />
  </div>
);

export default Content;
