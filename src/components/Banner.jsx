import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-11/12 mx-auto my-20">
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-purple-950/90 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl text-center">
        {/* Ambient glow decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Get Started Free
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Ready To Accelerate Your Workflow?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Join thousands of developers, designers, and creators who rely on DigiTools for fast, secure in-browser productivity.
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center pt-3">
            <a
              href="#utilities"
              className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold border-none rounded-2xl px-8 shadow-xl shadow-indigo-500/30 flex items-center gap-2"
            >
              Launch Utilities Suite
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#pricing"
              className="btn btn-outline border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-200 rounded-2xl px-7"
            >
              View Pricing
            </a>
          </div>

          <p className="text-[11px] text-slate-400 pt-2">
            No credit card required • Instant access in browser • Free forever utilities
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
