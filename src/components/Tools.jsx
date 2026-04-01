import React from "react";
import Cart from "./Cart";

const Tools = ({ tools, activeTab, setActiveTab }) => {
  return (
    <>
      <div className="w-11/12 mt-20 mx-auto">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold ">Premium Digital Tools</h2>
          <p className="text-md">
            Choose from our curated collection of premium digital products
            designed <br />
            to boost your productivity and creativity.
          </p>

          <div className="tabs tabs-box w-44 mx-auto rounded-4xl font-semibold">
            <input
              type="radio"
              name="my_tabs_1"
              className="tab rounded-4xl w-20 text-black font-semibold"
              aria-label="Products"
              checked={activeTab === "tool"}
              onChange={() => setActiveTab("tool")}
            />
            <input
              type="radio"
              name="my_tabs_1"
              className="tab rounded-4xl w-20 text-black"
              aria-label="Cart"
              checked={activeTab === "cart"}
              onChange={() => setActiveTab("cart")}
            />
          </div>
        </div>

        <div className="mt-10">
          {activeTab === "tool" ? (
            <div className="w-11/12 mx-auto grid md:grid-cols-2 xl:grid-cols-3">
              {tools.map((tool) => (
                <div key={tool.id} className="my-5 w-11/12 mx-auto flex gap-5">
                  <div className="card w-96 bg-base-100 shadow-sm">
                    <div className="card-body space-y-2">
                      <div className="flex justify-between">
                        <img src={tool.icon} className="w-5" alt="icon" />
                        <span className="badge badge-xs badge-primary">
                          {tool.tagType}
                        </span>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <h2 className="text-3xl font-bold">{tool.name}</h2>
                        <p className="text-md">{tool.description}</p>
                        <h3 className="text-xl font-semibold">
                          ${tool.price}{" "}
                          <span className="text-sm">
                            /{tool.period === "Monthly" ? "MO" : "YR"}
                          </span>
                        </h3>
                      </div>

                      <ul className="flex flex-col gap-2 text-xs">
                        {tool.features.map((feature, index) => (
                          <li key={index}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-4 me-2 inline-block text-success"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-0">
                        <button className="btn btn-primary btn-block rounded-4xl">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Cart />
          )}
        </div>
      </div>
    </>
  );
};

export default Tools;
