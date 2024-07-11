import React from "react";
import FAQAccordion from "./FAQAccordion";

const AboutUs = () => {
  return (
    <div className="container mx-auto   bg-gray-900 pb-4 px-12 flex flex-col flex-grow min-h-screen">
      <h1 className="text-3xl font-bold pt-20 ">About Us</h1>
      <p className="my-4  text-lg text-[#d1d4bf] leading-relaxed">
        Movie Mania is your ultimate destination for everything related to
        movies and TV shows. Discover new releases, explore genres, watch
        trailers, and more.
      </p>
      {/* <div className="relative h-0" style={{ paddingBottom: "56.25%" }}>
        <iframe
          title="Quick Tour"
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/y1-w1kUGuz8?si=qvpCLIl3RusDzp28"
          referrerPolicy="strict-origin-when-cross-origin"
          frameBorder
          allowFullScreen
        ></iframe>
      </div> */}
      <h1 className="text-2xl font-bold pt-4 mt-4 ">FAQ's</h1>

      <FAQAccordion />
    </div>
  );
};

export default AboutUs;
