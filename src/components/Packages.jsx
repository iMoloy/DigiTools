import React, { use } from "react";
import designTool from "../assets/products/design-tool.png";

const get = use(getPromise);
console.log(getPromise);

const Packages = ({packagesPromise}) => {
  const get =
  console.log(packages);
  return (
    <>
    <div className="w-11/12 mt-20">
    <div className="">
      <h2>Premium Digital Tools</h2>
      <p>Choose from our curated collection of premium digital products designed <br />
to boost your productivity and creativity.</p>
        <div className="flex gap-1 bg-white rounded-4xl w-40 mx-auto">
          <button className="btn btn-primary rounded-4xl">Products</button>
          <button className="btn rounded-4xl">Cart</button>
        </div>
    </div>
      <div>
        {packages.map(model=> <div>
          
        </div> )}
      </div>
      <div className="my-20 w-11/12 mx-auto flex gap-5 flex-col-3">
        <div className="card w-96 bg-base-100 shadow-sm">
          <div className="card-body space-y-2">
            <div className="flex justify-between">
              <img src={designTool} className="w-5" />
              <span className="badge badge-xs badge-warning">Most Popular</span>
            </div>

            <div className="flex flex-col space-y-2">
              <h2 className="text-3xl font-bold">Premium</h2>
              <p className="text-md">Lorem ipsum dolor sit ame.</p>
              <span className="text-xl font-semibold">$29/mo</span>
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
                <span>High-resolution image generation</span>
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
                <span>Customizable style templates</span>
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
                <span>Batch processing capabilities</span>
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
      </div>
    </>
  );
};

export default Packages;
