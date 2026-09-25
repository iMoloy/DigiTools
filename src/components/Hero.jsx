import React from "react";
import { Sparkles, ArrowRight, Zap, ShieldCheck, CheckCircle2, Cpu } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      <div className="w-11/12 mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Next-Generation Creator & Developer Suite
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Smart Utilities & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
                Digital Assets In One Place
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Elevate your daily digital workflow with our in-browser AI text suite,
              lightning-fast image compressor, and code beautifier — zero setup, zero latency, 100% private.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#utilities"
                className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold border-none rounded-2xl px-7 shadow-xl shadow-indigo-500/25 flex items-center gap-2"
              >
                Launch Utilities Suite
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#marketplace"
                className="btn btn-outline border-slate-700 hover:border-slate-500 hover:bg-slate-800/60 text-slate-300 rounded-2xl px-6"
              >
                Browse Marketplace
              </a>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero-Upload Privacy
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <Zap className="w-4 h-4 text-amber-400" />
                Instant Client-Side Speed
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Gemini AI Ready
              </span>
            </div>
          </div>

          {/* Right Hero Interactive Glass Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-indigo-500/30 via-slate-800/40 to-cyan-500/20 shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)]">
              <div className="rounded-[22px] bg-slate-950/90 border border-slate-800/80 p-6 backdrop-blur-2xl space-y-4">
                {/* Header Mock */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      digitools-workspace.v2
                    </span>
                  </div>
                  <span className="badge badge-xs bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-semibold">
                    Live
                  </span>
                </div>

                {/* Feature Mini Cards */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                        AI
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          AI Grammar & Rewriter
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Instant fixes, tone adapt, reading metrics
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400">Active</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                        IMG
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          Canvas Image Compressor
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Convert to WebP, shrink size up to 90%
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400">Client-Side</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                        &lt;/&gt;
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          Code Formatter & Minifier
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          HTML, CSS, JS, JSON with Prism tokens
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-cyan-400">Prism</span>
                  </div>
                </div>

                {/* Banner inside Card */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-800/40 text-[11px] text-indigo-300 flex items-center justify-between">
                  <span>⚡ 100% Free & Open In-Browser Suite</span>
                  <a href="#utilities" className="font-bold underline">
                    Try Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Glass Stats Bar */}
        <div className="mt-16 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-6 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
              50,000+
            </h3>
            <p className="text-xs font-semibold text-slate-400">Active Creators & Devs</p>
          </div>

          <div className="space-y-1 border-l border-slate-800">
            <h3 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              0 ms
            </h3>
            <p className="text-xs font-semibold text-slate-400">Server Latency (Client)</p>
          </div>

          <div className="space-y-1 border-l border-slate-800">
            <h3 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">
              3-in-1
            </h3>
            <p className="text-xs font-semibold text-slate-400">Interactive Utilities</p>
          </div>

          <div className="space-y-1 border-l border-slate-800">
            <h3 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">
              4.9 / 5
            </h3>
            <p className="text-xs font-semibold text-slate-400">Community Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
