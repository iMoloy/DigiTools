import React from "react";
import { toast } from "react-toastify";

const Cart = ({ cartItems, setCartItems, setActiveTab }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemove = (id, name) => {
    const remainingItems = cartItems.filter((item) => item.id !== id);
    setCartItems(remainingItems);
    toast.error(`${name} removed from cart!`);
  };

  const handleCheckout = () => {
    setCartItems([]);
    toast.success("Proceeded to checkout successfully!");
  };

  return (
    <div className="w-full md:w-8/12 lg:w-7/12 mx-auto mt-8">
      <div className="card bg-base-100 border border-gray-100 shadow-[0_4px_30px_rgb(0,0,0,0.05)] rounded-2xl">
        <div className="card-body p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-6 text-left text-[#1A1A2E]">
            Your Cart
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg font-semibold">
                Your cart is completely empty!
              </p>
              <button
                onClick={() => setActiveTab("tool")}
                className="btn btn-outline btn-primary mt-4 rounded-full"
              >
                Explore Products
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-[#F9FAFB] p-4 rounded-2xl mb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <img
                        src={item.icon}
                        alt="icon"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg text-[#1A1A2E]">
                        {item.name}
                      </h3>
                      <p className="text-gray-400 font-medium text-sm">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="btn btn-ghost text-error font-semibold hover:bg-error/10"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex justify-between items-center mt-6 mb-6 px-2 border-t pt-4">
                <span className="text-gray-500 font-semibold text-lg">
                  Total:
                </span>
                <span className="text-3xl font-extrabold text-[#1A1A2E]">
                  ${totalPrice}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full rounded-full text-white text-lg capitalize font-semibold border-none bg-[#7C3AED] hover:bg-[#6D28D9]"
              >
                Proceed To Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
