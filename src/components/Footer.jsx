import React from "react";
import { Sparkles, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl text-slate-400 py-16">
      <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {/* Brand Column */}
        <div className="col-span-2 space-y-4">
          <a
            href="#"
            className="flex items-center gap-2.5 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>DigiTools</span>
          </a>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            High-performance Web Utilities & Digital Converter Suite.
            Crafted for developers, designers, and creators to streamline everyday tasks in the browser.
          </p>
        </div>

        {/* Column: Utilities */}
        <div className="flex flex-col space-y-2.5 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
            Utilities
          </h4>
          <a href="#utilities" className="hover:text-indigo-400 transition">
            AI Text Suite
          </a>
          <a href="#utilities" className="hover:text-indigo-400 transition">
            Image Compressor
          </a>
          <a href="#utilities" className="hover:text-indigo-400 transition">
            Code Beautifier
          </a>
          <a href="#utilities" className="hover:text-indigo-400 transition">
            WebP Converter
          </a>
        </div>

        {/* Column: Marketplace */}
        <div className="flex flex-col space-y-2.5 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
            Catalog
          </h4>
          <a href="#marketplace" className="hover:text-indigo-400 transition">
            All Products
          </a>
          <a href="#marketplace" className="hover:text-indigo-400 transition">
            Design Assets
          </a>
          <a href="#marketplace" className="hover:text-indigo-400 transition">
            Dev Software
          </a>
          <a href="#pricing" className="hover:text-indigo-400 transition">
            Subscriptions
          </a>
        </div>

        {/* Column: Resources */}
        <div className="flex flex-col space-y-2.5 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
            Resources
          </h4>
          <a href="#steps" className="hover:text-indigo-400 transition">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-indigo-400 transition">
            Pricing Plans
          </a>
          <a
            href="https://github.com/iMoloy/DigiTools"
            target="_blank"
            rel="noreferrer"
            className="hover:text-indigo-400 transition"
          >
            GitHub Repository
          </a>
        </div>

        {/* Column: Social Links */}
        <div className="flex flex-col space-y-3 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
            Connect
          </h4>
          <div className="flex gap-2">
            <a
              href="https://github.com/iMoloy/DigiTools"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/iMoloy"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 flex items-center justify-center transition"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-11/12 mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
        <p>© {new Date().getFullYear()} DigiTools. Built with React 19 & Tailwind CSS.</p>
        <p className="flex items-center gap-1.5 text-slate-400">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> by{" "}
          <strong className="text-slate-200">Moloy Krishna Paul</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
