import React from "react";
import { toast } from "react-toastify";
import Cart from "./Cart";

const Tools = ({ tools, activeTab, setActiveTab, cartItems, setCartItems }) => {
  const handleAddToCart = (tool) => {
    const isExist = cartItems.find((item) => item.id === tool.id);
    if (isExist) {
      toast.warning("Product is already in your cart!");
    } else {
      setCartItems([...cartItems, tool]);
      toast.success(`${tool.name} added to cart successfully!`);
    }
  };

  return (
    <>
      <div className="w-11/12 mt-20 mx-auto">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold ">Premium Digital Tools</h2>
          <p className="text-md text-gray-500">
            Choose from our curated collection of premium digital products
            designed <br />
            to boost your productivity and creativity.
          </p>

          <div className="tabs tabs-box w-auto inline-flex mx-auto rounded-4xl font-semibold mt-5">
            <input
              type="radio"
              name="my_tabs_1"
              className={`tab rounded-4xl px-6 font-semibold transition-all duration-300 ${
                activeTab === "tool"
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }`}
              aria-label="Products"
              checked={activeTab === "tool"}
              onChange={() => setActiveTab("tool")}
            />
            <input
              type="radio"
              name="my_tabs_1"
              className={`tab rounded-4xl px-6 font-semibold transition-all duration-300 ${
                activeTab === "cart"
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }`}
              aria-label={`Cart (${cartItems.length})`}
              checked={activeTab === "cart"}
              onChange={() => setActiveTab("cart")}
            />
          </div>
        </div>

        <div className="mt-10 mb-20">
          {activeTab === "tool" ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tools.map((tool) => {
                const isAdded = cartItems.find((item) => item.id === tool.id);

                return (
                  <div
                    key={tool.id}
                    className="card bg-base-100 shadow-sm border border-gray-100"
                  >
                    <div className="card-body space-y-2">
                      <div className="flex justify-between items-center">
                        <img
                          src={tool.icon}
                          alt="icon"
                          className="w-8 h-8 object-contain"
                        />
                        <span className="badge badge-primary badge-outline text-xs">
                          {tool.tagType}
                        </span>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl font-bold">{tool.name}</h2>
                        <p className="text-sm text-gray-500 whitespace-pre-line">
                          {tool.description}
                        </p>
                        <h3 className="text-xl font-semibold mt-2">
                          ${tool.price}{" "}
                          <span className="text-sm font-normal text-gray-400">
                            /{tool.period === "Monthly" ? "MO" : "YR"}
                          </span>
                        </h3>
                      </div>

                      <ul className="flex flex-col gap-2 text-sm mt-3 grow">
                        {tool.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-4 text-success shrink-0"
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
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4">
                        <button
                          onClick={() => handleAddToCart(tool)}
                          disabled={isAdded}
                          className={`btn btn-block rounded-4xl text-white ${isAdded ? "btn-success disabled:bg-success disabled:text-white" : "btn-primary"}`}
                        >
                          {isAdded ? "Added to cart" : "Buy Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Tools;
