import React from "react";
import bannerImg from "../assets/banner.png";
import playBtn from "../assets/Play.png"

const Hero = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen py-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={bannerImg}
            className="rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Supercharge Your <br />Digital Workflow
            </h1>
            <p className="py-6">
              Access premium AI tools, design assets, templates, and <br />
              productivity software—all in one place. Start creating faster <br />
              today. Explore Products
            </p>
            <div className=" flex gap-3">
              <button className="btn btn-primary rounded-4xl">Explore Products</button>
              <button className="btn border-primary rounded-4xl text-primary"><img
            src={playBtn}
            className=""
          />Watch Demo</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
