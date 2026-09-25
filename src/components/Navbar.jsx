import React from "react";
import { Sparkles, ShoppingBag, Terminal, Shield, ArrowUpRight } from "lucide-react";

const Navbar = ({ cartItems = [], onOpenCart }) => {
  return (
    <header className="sticky top-0 z-50 px-4 pt-3 pb-2 backdrop-blur-xl bg-[#0B0F17]/70 border-b border-white/5 transition-all">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 hover:opacity-90 transition"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>DigiTools</span>
          </a>
          <span className="hidden sm:inline-block badge badge-sm bg-indigo-500/10 text-indigo-300 border-indigo-500/30 font-medium">
            Suite 2.5
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner text-sm font-semibold">
          <a
            href="#utilities"
            className="px-4 py-1.5 rounded-full text-white hover:bg-slate-800/60 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Web Utilities
            <span className="badge badge-xs bg-emerald-500/20 text-emerald-400 border-none font-bold">
              NEW
            </span>
          </a>
          <a
            href="#marketplace"
            className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            Catalog
          </a>
          <a
            href="#steps"
            className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            Workflow
          </a>
          <a
            href="#pricing"
            className="px-4 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            Pricing
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="btn btn-circle btn-ghost text-slate-300 hover:text-white relative bg-slate-900/50 border border-slate-800/60 hover:bg-slate-800"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-indigo-500/50 animate-pulse">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Quick Launch CTA */}
          <a
            href="#utilities"
            className="btn btn-sm md:btn-md bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold border-none rounded-full px-5 shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 text-xs md:text-sm"
          >
            Launch Tools
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
