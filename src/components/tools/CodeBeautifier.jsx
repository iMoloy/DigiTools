import React, { useState, useMemo, useRef } from "react";
import {
  Code2,
  Copy,
  Check,
  Sparkles,
  Minimize2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-json";
import {
  formatCode,
  minifyCode,
  SAMPLE_CODE_SNIPPETS,
} from "../../utils/codeFormatter";

const LANGUAGES = [
  { id: "javascript", label: "JavaScript", prismLang: "javascript", icon: "⚡" },
  { id: "html", label: "HTML", prismLang: "markup", icon: "🌐" },
  { id: "css", label: "CSS", prismLang: "css", icon: "🎨" },
  { id: "json", label: "JSON", prismLang: "json", icon: "📦" },
];

const CodeBeautifier = () => {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(SAMPLE_CODE_SNIPPETS.javascript);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copied, setCopied] = useState(false);
  const [savings, setSavings] = useState(0);
  const [activeTab, setActiveTab] = useState("highlight"); // "highlight" | "raw"

  const codeDisplayRef = useRef(null);

  // Compute syntax highlighted HTML cleanly via useMemo without cascading effects
  const highlightedCode = useMemo(() => {
    try {
      const activeLangObj = LANGUAGES.find((l) => l.id === language);
      const prismGrammar = Prism.languages[activeLangObj?.prismLang || "javascript"];

      if (prismGrammar && code) {
        return Prism.highlight(
          code,
          prismGrammar,
          activeLangObj?.prismLang || "javascript"
        );
      }
      return code;
    } catch {
      return code;
    }
  }, [code, language]);

  const lineCount = code ? code.split("\n").length : 0;
  const charCount = code.length;

  const handleBeautify = (spaces = 2) => {
    setErrorMsg(null);
    const res = formatCode(code, language, spaces);
    if (res.success) {
      setCode(res.formatted);
      toast.success(`Formatted ${language.toUpperCase()} with ${spaces} spaces!`);
    } else {
      setErrorMsg(res.error);
      toast.error(res.error || "Failed to format code");
    }
  };

  const handleMinify = () => {
    setErrorMsg(null);
    const res = minifyCode(code, language);
    if (res.success) {
      setCode(res.minified);
      setSavings(res.savings);
      toast.success(
        `Minified! Reduced size by ${res.savings}% (${res.savedChars} characters saved)`
      );
    } else {
      setErrorMsg(res.error);
      toast.error(res.error || "Failed to minify code");
    }
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    setErrorMsg(null);
    setCode(SAMPLE_CODE_SNIPPETS[newLang] || "");
  };

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const lineNumbers = code ? code.split("\n").map((_, i) => i + 1) : [1];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              Code Beautifier & Syntax Highlighter
              <span className="badge badge-sm bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                Prism Powered
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Format, prettify, minify, and inspect HTML, CSS, JavaScript, and JSON with syntax styling
            </p>
          </div>
        </div>

        {/* Language Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/70 border border-slate-800">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => handleLanguageChange(lang.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                language === lang.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>{lang.icon}</span>
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleBeautify(2)}
            className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Beautify (2 Spaces)
          </button>

          <button
            onClick={() => handleBeautify(4)}
            className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 rounded-xl text-xs flex items-center gap-1.5"
          >
            Beautify (4 Spaces)
          </button>

          <button
            onClick={handleMinify}
            className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700 rounded-xl text-xs flex items-center gap-1.5"
          >
            <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
            Minify Code
          </button>

          <button
            onClick={() => setCode(SAMPLE_CODE_SNIPPETS[language] || "")}
            className="btn btn-sm btn-ghost text-slate-400 hover:text-slate-200 rounded-xl text-xs"
          >
            Reset Sample
          </button>

          <button
            onClick={() => {
              setCode("");
              setErrorMsg(null);
            }}
            className="btn btn-sm btn-ghost text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab selector between editable textarea and highlighted view */}
          <div className="flex items-center rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab("highlight")}
              className={`px-2.5 py-1 rounded font-semibold transition ${
                activeTab === "highlight"
                  ? "bg-slate-800 text-cyan-300 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Formatted Preview
            </button>
            <button
              onClick={() => setActiveTab("raw")}
              className={`px-2.5 py-1 rounded font-semibold transition ${
                activeTab === "raw"
                  ? "bg-slate-800 text-cyan-300 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Raw Editor
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 rounded-xl px-4 text-xs flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Syntax Error Alert (if any) */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span className="font-semibold">{errorMsg}</span>
        </div>
      )}

      {/* Code Window with Glass Terminal Style */}
      <div className="rounded-2xl bg-slate-950/90 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="ml-2 font-mono text-slate-300 text-[11px]">
              snippet.{language === "javascript" ? "js" : language}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Lines: {lineCount}</span>
            <span>Chars: {charCount}</span>
            {savings > 0 && (
              <span className="text-emerald-400 font-bold">
                -{savings}% Minified
              </span>
            )}
          </div>
        </div>

        {/* Code Content Container */}
        <div className="relative flex min-h-[380px] max-h-[540px] overflow-auto font-mono text-xs leading-relaxed">
          {/* Line Numbers Column */}
          <div className="select-none py-4 px-3 text-right bg-slate-950/60 border-r border-slate-800/60 text-slate-600 font-mono text-xs w-12 shrink-0">
            {lineNumbers.map((num) => (
              <div key={num} className="leading-6">
                {num}
              </div>
            ))}
          </div>

          {/* Code Body */}
          <div className="flex-1 p-4 overflow-x-auto">
            {activeTab === "raw" ? (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste code to beautify and minify..."
                className="w-full h-full min-h-[340px] bg-transparent text-slate-200 resize-none focus:outline-none font-mono text-xs leading-6"
                spellCheck="false"
              />
            ) : (
              <pre className="m-0 p-0 bg-transparent text-slate-100 font-mono text-xs leading-6 overflow-x-auto whitespace-pre">
                <code
                  ref={codeDisplayRef}
                  className={`language-${
                    LANGUAGES.find((l) => l.id === language)?.prismLang || "javascript"
                  }`}
                  dangerouslySetInnerHTML={{ __html: highlightedCode || code }}
                />
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBeautifier;
