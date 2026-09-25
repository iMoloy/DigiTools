import React, { useState } from "react";
import { Sparkles, ImageIcon, Code2, Wrench, ShieldCheck, Flame } from "lucide-react";
import AiTextSuite from "./AiTextSuite";
import ImageCompressor from "./ImageCompressor";
import CodeBeautifier from "./CodeBeautifier";

const UTILITY_TABS = [
  {
    id: "ai-text",
    name: "AI Text Suite",
    desc: "Grammar, Rewriter & Tone",
    icon: Sparkles,
    badge: "AI Powered",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "img-compress",
    name: "Image Compressor",
    desc: "WebP / JPG / PNG Converter",
    icon: ImageIcon,
    badge: "100% Client-Side",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "code-beautifier",
    name: "Code Beautifier",
    desc: "HTML / CSS / JS / JSON",
    icon: Code2,
    badge: "Prism Engine",
    color: "from-cyan-500 to-blue-600",
  },
];

const UtilitiesWorkspace = () => {
  const [activeTool, setActiveTool] = useState("ai-text");

  return (
    <section id="utilities" className="w-11/12 mx-auto my-20 scroll-mt-24">
      {/* Section Title */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Flame className="w-4 h-4 text-indigo-400" />
          Interactive Web Utilities & Converter Suite
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Supercharge Your Workflow In-Browser
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Zero installation required. Run grammar checks, shrink and convert images, and format code with high-performance, client-side speed.
        </p>

        {/* Tab Switcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-8 p-1.5 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl">
          {UTILITY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTool === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTool(tab.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all relative overflow-hidden ${
                  isActive
                    ? "bg-slate-900 border border-slate-700/80 shadow-xl ring-1 ring-indigo-500/50"
                    : "hover:bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                {isActive && (
                  <span
                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-10 pointer-events-none`}
                  />
                )}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition ${
                    isActive
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-md`
                      : "bg-slate-800/80 text-slate-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm font-bold ${
                        isActive ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {tab.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">
                    {tab.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool Container Glass Card */}
      <div className="rounded-3xl bg-slate-900/40 border border-slate-800/80 p-6 md:p-8 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.5)]">
        {activeTool === "ai-text" && <AiTextSuite />}
        {activeTool === "img-compress" && <ImageCompressor />}
        {activeTool === "code-beautifier" && <CodeBeautifier />}
      </div>
    </section>
  );
};

export default UtilitiesWorkspace;
