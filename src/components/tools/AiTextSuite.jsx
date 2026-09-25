import React, { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  RefreshCw,
  SlidersHorizontal,
  Copy,
  Check,
  RotateCcw,
  Zap,
  Key,
  HelpCircle,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { toast } from "react-toastify";
import { processAiText, computeTextMetrics } from "../../utils/aiTextService";

const SAMPLE_TEXTS = {
  grammar:
    "We was going to teh store untill they said their closing. I think that we definately need to double check the the schedule in order to make sure we dont miss it.",
  rewrite:
    "DigiTools is a really good website that has a lot of tools for developers and creators. It helps people make stuff faster and basically improves their daily workflow.",
  tone:
    "hey bro, can you send over that file asap? kinda need it right now for the client presentation thanks ya.",
};

const TONES = [
  { name: "Professional", desc: "Polished, corporate & courteous", icon: "💼" },
  { name: "Casual", desc: "Warm, friendly & conversational", icon: "☕" },
  { name: "Persuasive", desc: "Compelling & action-driven", icon: "🎯" },
  { name: "Academic", desc: "Scholarly, formal & rigorous", icon: "🎓" },
  { name: "Concise", desc: "Direct, punchy & zero fluff", icon: "⚡" },
];

const REWRITE_STYLES = [
  { id: "fluent", name: "Fluent & Natural", desc: "Smooth sentences with polished vocabulary" },
  { id: "creative", name: "Creative & Engaging", desc: "Vivid expressions and storytelling flair" },
  { id: "concise", name: "Concise & Punchy", desc: "Cuts fillers, keeps high-impact points" },
];

const AiTextSuite = () => {
  const [activeSubTab, setActiveSubTab] = useState("grammar"); // "grammar" | "rewrite" | "tone"
  const [inputText, setInputText] = useState(SAMPLE_TEXTS.grammar);
  const [outputText, setOutputText] = useState("");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [selectedStyle, setSelectedStyle] = useState("fluent");
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeEngine, setActiveEngine] = useState("smart-nlp");
  const [copied, setCopied] = useState(false);

  // Gemini API Key management
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [tempApiKey, setTempApiKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("digitools_gemini_key") || "";
    setGeminiApiKey(saved);
    setTempApiKey(saved);
  }, []);

  const metrics = computeTextMetrics(inputText);

  const handleProcess = async () => {
    if (!inputText.trim()) {
      toast.warning("Please enter some text first!");
      return;
    }

    setIsProcessing(true);
    setCopied(false);
    try {
      const res = await processAiText({
        action: activeSubTab,
        text: inputText,
        tone: selectedTone,
        rewriteStyle: selectedStyle,
        apiKey: geminiApiKey,
      });

      if (res.success) {
        setOutputText(res.output);
        setSuggestions(res.suggestions || []);
        setActiveEngine(res.engine || "smart-nlp");
        toast.success(
          activeSubTab === "grammar"
            ? "Grammar & style check complete!"
            : activeSubTab === "rewrite"
            ? "Text rewritten successfully!"
            : `Converted to ${selectedTone} tone!`
        );
      } else {
        toast.error(res.error || "Failed to process text.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyToInput = () => {
    if (!outputText) return;
    setInputText(outputText);
    toast.info("Output replaced in editor.");
  };

  const handleLoadSample = (key) => {
    setInputText(SAMPLE_TEXTS[key]);
    setOutputText("");
    setSuggestions([]);
  };

  const handleSaveApiKey = () => {
    const cleanKey = tempApiKey.trim();
    setGeminiApiKey(cleanKey);
    localStorage.setItem("digitools_gemini_key", cleanKey);
    setApiKeyModalOpen(false);
    toast.success(cleanKey ? "Gemini API Key saved!" : "Using Smart NLP Local Engine.");
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Engine Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              AI Text Intelligence Suite
              <span className="badge badge-sm bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-medium">
                v2.5
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Grammar correction, intelligent paraphrasing, and tone transformation
            </p>
          </div>
        </div>

        {/* Engine switcher & API key modal trigger */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition ${
              activeEngine === "gemini-ai" || geminiApiKey
                ? "bg-violet-950/40 text-violet-300 border-violet-500/40"
                : "bg-emerald-950/40 text-emerald-300 border-emerald-500/40"
            }`}
          >
            {activeEngine === "gemini-ai" || geminiApiKey ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Gemini 1.5 Flash Active
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Smart Local NLP (Instant)
              </>
            )}
          </div>

          <button
            onClick={() => setApiKeyModalOpen(true)}
            className="btn btn-xs btn-outline border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg flex items-center gap-1"
            title="Configure Gemini API Key"
          >
            <Key className="w-3 h-3" />
            API Key
          </button>
        </div>
      </div>

      {/* Sub Tabs: Grammar | Rewrite | Tone */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 w-fit">
        <button
          onClick={() => {
            setActiveSubTab("grammar");
            setOutputText("");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === "grammar"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Grammar & Spelling
        </button>

        <button
          onClick={() => {
            setActiveSubTab("rewrite");
            setOutputText("");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === "rewrite"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Text Rewriter
        </button>

        <button
          onClick={() => {
            setActiveSubTab("tone");
            setOutputText("");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === "tone"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Tone Changer
        </button>
      </div>

      {/* Mode-Specific Controls */}
      {activeSubTab === "tone" && (
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Select Desired Communication Tone:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {TONES.map((tone) => (
              <button
                key={tone.name}
                onClick={() => setSelectedTone(tone.name)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedTone === tone.name
                    ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500"
                    : "bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{tone.icon}</span>
                  <span className="font-bold text-sm">{tone.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {tone.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === "rewrite" && (
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Select Paraphrasing Style:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {REWRITE_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedStyle === style.id
                    ? "bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500"
                    : "bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/50"
                }`}
              >
                <div className="font-bold text-sm">{style.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Editor & Output Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="flex flex-col rounded-2xl bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Source Text
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLoadSample(activeSubTab)}
                className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition"
              >
                Load Sample
              </button>
              <button
                onClick={() => {
                  setInputText("");
                  setOutputText("");
                  setSuggestions([]);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 transition"
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full h-72 p-4 bg-transparent text-slate-100 placeholder-slate-500 resize-none focus:outline-none font-normal text-sm leading-relaxed"
          />

          {/* Input Metrics Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-slate-800/80 bg-slate-950/30 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span>
                Words: <strong className="text-slate-200">{metrics.words}</strong>
              </span>
              <span>
                Chars: <strong className="text-slate-200">{metrics.characters}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />~{metrics.readingTimeSeconds}s read
              </span>
              <span className="badge badge-xs bg-slate-800 text-slate-300 border-none">
                {metrics.gradeLevel}
              </span>
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing || !inputText.trim()}
              className="btn btn-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none rounded-xl px-5 shadow-lg shadow-indigo-500/25 flex items-center gap-1.5"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeSubTab === "grammar"
                    ? "Fix Grammar & Style"
                    : activeSubTab === "rewrite"
                    ? "Paraphrase Text"
                    : `Apply ${selectedTone} Tone`}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col rounded-2xl bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Enhanced Result
            </span>

            {outputText && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleApplyToInput}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
                  title="Replace input with this result"
                >
                  <ArrowRight className="w-3 h-3" />
                  Use as Input
                </button>
                <button
                  onClick={handleCopy}
                  className="btn btn-xs btn-ghost text-slate-300 hover:text-white rounded-lg flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-success" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="w-full h-72 p-4 overflow-y-auto text-sm leading-relaxed text-slate-100">
            {outputText ? (
              <p className="whitespace-pre-wrap">{outputText}</p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500">
                <Sparkles className="w-8 h-8 mb-2 text-slate-600 opacity-60" />
                <p className="text-sm font-medium">No results generated yet.</p>
                <p className="text-xs text-slate-600 mt-1">
                  Click the action button to process your text with AI.
                </p>
              </div>
            )}
          </div>

          {/* Output Analysis / Suggestions Footer */}
          <div className="px-4 py-3 border-t border-slate-800/80 bg-slate-950/30 text-xs min-h-[46px] flex items-center justify-between">
            {suggestions.length > 0 ? (
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                <span className="text-slate-400 font-semibold shrink-0">Insights:</span>
                {suggestions.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="badge badge-xs bg-indigo-950/60 text-indigo-300 border-indigo-700/50 py-2 px-2 shrink-0"
                  >
                    {item.issue}
                  </span>
                ))}
                {suggestions.length > 3 && (
                  <span className="text-slate-500 text-[11px] shrink-0">
                    +{suggestions.length - 3} more
                  </span>
                )}
              </div>
            ) : (
              <span className="text-slate-500">
                {outputText
                  ? "Clean text with high readability score."
                  : "Ready to inspect and enhance."}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Gemini API Key Modal */}
      {apiKeyModalOpen && (
        <div className="modal modal-open bg-black/70 backdrop-blur-md">
          <div className="modal-box bg-slate-900 border border-slate-700 text-white max-w-md shadow-2xl rounded-2xl">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-400" />
              Google Gemini API Settings
            </h3>
            <p className="py-3 text-xs text-slate-300 leading-relaxed">
              DigiTools automatically runs an ultra-fast, intelligent NLP engine client-side.
              If you wish to unlock Google Gemini 1.5 Flash capabilities, paste your Gemini API key below:
            </p>

            <div className="space-y-3 mt-2">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="input input-bordered w-full bg-slate-950 border-slate-700 text-white rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  Get a free Gemini API Key →
                </a>
                <span>Saved locally in browser</span>
              </div>
            </div>

            <div className="modal-action mt-6">
              <button
                onClick={() => setApiKeyModalOpen(false)}
                className="btn btn-sm btn-ghost text-slate-400 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                className="btn btn-sm btn-primary rounded-xl px-5 text-white"
              >
                Save Preference
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiTextSuite;
