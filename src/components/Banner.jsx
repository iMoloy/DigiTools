import React from "react";

const Banner = () => {
  return (
    <div className="bg-primary text-white py-20">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready To Transform Your Workflow?
        </h2>
        <p className="mb-8 text-primary-content text-lg">
          Join thousands of professionals who are already using DigiTools to
          work smarter. Start your free trial today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="btn bg-white text-primary border-none hover:bg-gray-100 rounded-full px-8">
            Explore Products
          </button>
          <button className="btn btn-outline text-white border-white hover:bg-white hover:text-primary rounded-full px-8">
            View Pricing
          </button>
        </div>
        <p className="mt-6 text-sm text-primary-content">
          14-day free trial • No credit card required • Cancel anytime
        </p>
      </div>
    </div>
  );
};

export default Banner;
