import React, { use } from "react";

const Tools = ({ toolsPromise }) => {
  const tools = use(toolsPromise);
  console.log(tools);
  return (
    <>
      <div className="w-11/12 mt-20">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold ">Premium Digital Tools</h2>
          <p className="text-md">
            Choose from our curated collection of premium digital products
            designed <br />
            to boost your productivity and creativity.
          </p>
          <div className="flex gap-1 bg-white rounded-4xl w-40 mx-auto shadow-amber-300">
            <button className="btn btn-primary rounded-4xl">Products</button>
            <button className="btn rounded-4xl">Cart</button>
          </div>
        </div>
        <div className="w-11/12 mx-auto grid grid-cols-3">
          {tools.map((tool) => (
            <div className="my-5 w-11/12 mx-auto flex gap-5 ml-15">
              <div className="card w-96 bg-base-100 shadow-sm">
                <div className="card-body space-y-2">
                  <div className="flex justify-between">
                    <img src={tool.icon} className="w-5" />
                    <span className="badge badge-xs badge-primary">
                      {tool.tag}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <h2 className="text-3xl font-bold">{tool.name}</h2>
                    <p className="text-md">{tool.description}</p>
                    <h3 className="text-xl font-semibold">${tool.price} <span className="text-sm">/MO</span></h3>
                  </div>
                  <ul className="flex flex-col gap-2 text-xs">
                    <li>
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
                      <span>{tool.features[0]}</span>
                    </li>
                    <li>
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
                      <span>{tool.features[1]}</span>
                    </li>
                    <li>
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
                      <span>{tool.features[2]}</span>
                    </li>
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
      </div>
    </>
  );
};

export default Tools;
