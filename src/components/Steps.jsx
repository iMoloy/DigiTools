import React from "react";
import { Sparkles, Cpu, Download, ArrowRight } from "lucide-react";

const Steps = () => {
  return (
    <section id="steps" className="w-11/12 mx-auto my-24 scroll-mt-20">
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Simple & Frictionless
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Get Started In 3 Easy Steps
        </h2>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
          Start utilizing in-browser utilities and digital licenses in minutes with zero complicated setup.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="relative rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 hover:border-indigo-500/40 transition group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 text-indigo-400 font-mono text-sm font-bold flex items-center justify-center">
                01
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
              Select Your Utility
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open the interactive workspace above and pick between AI Text Suite, Image Compressor, or Code Beautifier.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 hover:border-emerald-500/40 transition group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-sm font-bold flex items-center justify-center">
                02
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition">
              Process & Fine-Tune
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tweak your compression ratio, choose communication tone, or select code indentation size with live visual feedback.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 hover:border-cyan-500/40 transition group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition">
                <Download className="w-6 h-6" />
              </div>
              <span className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-sm font-bold flex items-center justify-center">
                03
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
              Export Or Apply
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Download your newly compressed WebP file or copy beautified code and refined text directly to your clipboard in 1 click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
