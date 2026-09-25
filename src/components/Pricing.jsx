import React from "react";
import { Check, Sparkles, Shield, Zap } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative scroll-mt-20">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Transparent Subscriptions
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Flexible Plans for Any Scale
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
            Interactive web tools are always 100% free. Choose a license plan for premium cloud sync and team assets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Starter Tier */}
          <div className="rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-slate-700 transition">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Starter</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Perfect for individuals & casual creators
                </p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="text-4xl font-black text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever free</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited in-browser web utilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Image compressor (WebP, PNG, JPG)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>HTML/CSS/JS/JSON code formatter</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Smart local NLP text engine</span>
                </li>
              </ul>
            </div>

            <button className="btn btn-outline border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-slate-200 rounded-2xl w-full mt-8">
              Start Free Now
            </button>
          </div>

          {/* Pro Tier (Featured / Most Popular) */}
          <div className="rounded-3xl bg-gradient-to-b from-indigo-950/80 via-slate-900/90 to-purple-950/70 border border-indigo-500/50 backdrop-blur-2xl p-8 flex flex-col justify-between relative shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/50 scale-105 z-10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="badge bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-extrabold text-[11px] px-3.5 py-2.5 border-none shadow-md">
                MOST POPULAR
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Pro Creator
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </h3>
                <p className="text-xs text-indigo-200/70 mt-1">
                  Best for power developers & professional designers
                </p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="text-4xl font-black text-white">$29</span>
                <span className="text-xs text-indigo-200/70">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200 pt-4 border-t border-indigo-900/60">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Everything in Starter included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Google Gemini 1.5 Flash unlimited AI queries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Batch image compression without limits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full access to 200+ premium digital assets</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Priority 24/7 dedicated assistance</span>
                </li>
              </ul>
            </div>

            <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none rounded-2xl w-full mt-8 shadow-xl shadow-indigo-500/30 font-bold">
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-slate-700 transition">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1">
                  For engineering teams and creative agencies
                </p>
              </div>

              <div className="flex items-baseline gap-1 py-2">
                <span className="text-4xl font-black text-white">$99</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Everything in Pro for up to 25 seats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom API endpoints & Webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>SOC-2 compliance & SLA guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated account manager</span>
                </li>
              </ul>
            </div>

            <button className="btn btn-outline border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 text-slate-200 rounded-2xl w-full mt-8">
              Contact Enterprise
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
