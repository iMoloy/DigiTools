import React from "react";

const Hero = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen py-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src="/DigiTools/public/images/banner.png" className="rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">
              Supercharge Your <br />
              Digital Workflow
            </h1>
            <p className="py-6">
              Access premium AI tools, design assets, templates, and <br />
              productivity software—all in one place. Start creating faster{" "}
              <br />
              today. Explore Products
            </p>
            <div className=" flex gap-3">
              <button className="btn btn-primary rounded-4xl">
                Explore Products
              </button>
              <button className="btn border-primary rounded-4xl text-primary">
                <img src="/DigiTools/public/images/Play.png" className="" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="user bg-primary flex justify-around py-5">
        <div className="userInfo text-center">
          <h2 className="text-4xl text-white font-bold">50K</h2>
          <p className="text-white font-semibold">Active Users</p>
        </div>
        <div className="w-px h-auto bg-white/40"></div>
        <div className="tools text-center">
          <h2 className="text-4xl text-white font-bold">200+</h2>
          <p className="text-white font-semibold">Premium Tools</p>
        </div>
        <div className="w-px h-auto bg-white/40"></div>
        <div className="ratings text-center">
          <h2 className="text-4xl text-white font-bold">4.9</h2>
          <p className="text-white font-semibold">Ratings</p>
        </div>
      </div>
    </>
  );
};

export default Hero;
