import React from "react";

const Pricing = () => {
  return (
    <div className="bg-base-200/30 py-20">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3 text-[#1A1A2E]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center max-w-6xl mx-auto">
          <div className="card bg-base-100 shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-[#1A1A2E]">Starter</h3>
            <p className="text-sm text-gray-500 mb-4">
              Perfect for getting started
            </p>
            <h2 className="text-4xl font-extrabold mb-6">
              $0
              <span className="text-lg font-normal text-gray-400">/Month</span>
            </h2>
            <ul className="space-y-3 mb-8 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> Access to 10 free tools
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> Basic templates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> Community support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> 1 project per month
              </li>
            </ul>
            <button className="btn btn-primary w-full rounded-full">
              Get Started Free
            </button>
          </div>

          <div className="card bg-primary text-white shadow-xl relative p-6 scale-105 z-10">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="badge bg-amber-100 border-none text-amber-700 font-bold px-4 py-3 shadow-md">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-bold mt-4">Pro</h3>
            <p className="text-primary-content text-sm mb-4">
              Best for professionals
            </p>
            <h2 className="text-4xl font-extrabold mb-6">
              $29
              <span className="text-lg font-normal text-primary-content">
                /Month
              </span>
            </h2>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> Access to all premium
                tools
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> Unlimited templates
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> Priority support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> Unlimited projects
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> Cloud sync
              </li>
              <li className="flex items-center gap-2">
                <span className="text-white">✔</span> Advanced analytics
              </li>
            </ul>
            <button className="btn bg-white text-primary hover:bg-gray-100 border-none w-full rounded-full">
              Start Pro Trial
            </button>
          </div>

          <div className="card bg-base-100 shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-[#1A1A2E]">Enterprise</h3>
            <p className="text-sm text-gray-500 mb-4">
              For teams and businesses
            </p>
            <h2 className="text-4xl font-extrabold mb-6">
              $99
              <span className="text-lg font-normal text-gray-400">/Month</span>
            </h2>
            <ul className="space-y-3 mb-8 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> Everything in Pro
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> Team collaboration
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> Custom integrations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> Dedicated support
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> SLA guarantee
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✔</span> Custom branding
              </li>
            </ul>
            <button className="btn btn-primary w-full rounded-full">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
