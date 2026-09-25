import React from "react";
import { toast } from "react-toastify";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const Cart = ({ cartItems, setCartItems, setActiveTab }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemove = (id, name) => {
    const remainingItems = cartItems.filter((item) => item.id !== id);
    setCartItems(remainingItems);
    toast.info(`${name} removed from cart`);
  };

  const handleCheckout = () => {
    setCartItems([]);
    toast.success("Order simulated! Digital license keys sent to your email.");
  };

  return (
    <div className="w-full md:w-9/12 lg:w-7/12 mx-auto mt-6">
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-2xl shadow-2xl p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-black text-white">Your Shopping Cart</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-800/60 text-slate-500 mx-auto flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 opacity-40" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              Your cart is completely empty. Explore our catalog!
            </p>
            <button
              onClick={() => setActiveTab("tool")}
              className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 border-none shadow-md shadow-indigo-600/20"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Items List */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl transition hover:border-slate-700"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center p-2 shrink-0">
                      <img
                        src={item.icon}
                        alt="icon"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                        ${item.price}{" "}
                        <span className="text-slate-500 font-normal">
                          /{item.period === "Monthly" ? "mo" : "yr"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="btn btn-xs btn-ghost text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-200">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery:</span>
                <span className="text-emerald-400 font-semibold">Free (Instant)</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-sm">
                <span className="font-bold text-white">Total Amount:</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  ${totalPrice}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition active:scale-98 flex items-center justify-center gap-2 mt-4"
            >
              Proceed to Instant Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-bit encrypted checkout with 30-day money-back guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
