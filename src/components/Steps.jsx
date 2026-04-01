import React from "react";
import userPic from "../assets/user.png";
import userPackage from "../assets/package.png";
import userRocket from "../assets/rocket.png";

const Steps = () => {
  return (
    <div className="w-11/12 mx-auto my-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3 text-[#1A1A2E]">
          Get Started In 3 Steps
        </h2>
        <p className="text-gray-500">
          Start using premium digital tools in minutes, not hours.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-gray-100 relative pt-4">
          <div className="absolute top-6 right-6 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
            1
          </div>
          <div className="card-body items-center text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2 text-2xl">
              <img src={userPic} alt="" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="card-title font-bold text-[#1A1A2E]">
              Create Account
            </h3>
            <p className="text-sm text-gray-500">
              Sign up for free in seconds. No credit card required to get
              started.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-gray-100 relative pt-4">
          <div className="absolute top-6 right-6 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
            2
          </div>
          <div className="card-body items-center text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2 text-2xl">
              <img
                src={userPackage}
                alt=""
                className="w-8 h-8 object-contain"
              />
            </div>
            <h3 className="card-title font-bold text-[#1A1A2E]">
              Choose Products
            </h3>
            <p className="text-sm text-gray-500">
              Browse our catalog and select the tools that fit your needs.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-gray-100 relative pt-4">
          <div className="absolute top-6 right-6 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
            3
          </div>
          <div className="card-body items-center text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2 text-2xl">
              <img src={userRocket} alt="" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="card-title font-bold text-[#1A1A2E]">
              Start Creating
            </h3>
            <p className="text-sm text-gray-500">
              Download and start using your premium tools immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
