// AI Text Suite Service: Grammar Check, Text Rewriter, Tone Changer, and Metrics
// Supports both zero-config client-side Smart NLP heuristics and Google Gemini API

export async function processAiText({
  action, // "grammar" | "rewrite" | "tone"
  text,
  tone = "Professional",
  rewriteStyle = "fluent",
  apiKey = "",
}) {
  if (!text || !text.trim()) {
    return {
      success: false,
      output: "",
      error: "Please enter text to process.",
    };
  }

  // Check if user has a Gemini API key (from settings or env)
  const effectiveKey =
    apiKey ||
    localStorage.getItem("digitools_gemini_key") ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    "";

  if (effectiveKey && effectiveKey.trim().length > 10) {
    try {
      const geminiResult = await callGeminiApi({
        action,
        text,
        tone,
        rewriteStyle,
        apiKey: effectiveKey.trim(),
      });
      if (geminiResult && geminiResult.output) {
        return {
          success: true,
          output: geminiResult.output,
          suggestions: geminiResult.suggestions || [],
          engine: "gemini-ai",
        };
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to smart local NLP engine:", err);
    }
  }

  // Built-in Smart NLP Engine
  return processLocalNLP({ action, text, tone, rewriteStyle });
}

async function callGeminiApi({ action, text, tone, rewriteStyle, apiKey }) {
  let prompt = "";
  if (action === "grammar") {
    prompt = `You are a professional grammar and style editor.
Analyze the following text, correct all spelling, grammatical, punctuation, and structural issues.
Return a JSON object ONLY with the following structure:
{
  "correctedText": "The fully corrected text",
  "suggestions": [
    {"issue": "Brief explanation of issue", "original": "wrong word/phrase", "replacement": "corrected word/phrase"}
  ]
}
Text to check:
${text}`;
  } else if (action === "rewrite") {
    prompt = `You are an expert copywriter. Rewrite the following text with a ${rewriteStyle} style.
Maintain the original meaning while enhancing flow, clarity, and vocabulary.
Return a JSON object ONLY with the following structure:
{
  "rewrittenText": "The improved rewritten text",
  "improvements": ["Key improvement 1", "Key improvement 2"]
}
Text to rewrite:
${text}`;
  } else if (action === "tone") {
    prompt = `You are an expert communicator. Rewrite the following text to have a strictly "${tone}" tone.
Tone Guidelines:
- Professional: Clear, polite, confident, workplace-appropriate, no slang.
- Casual: Warm, friendly, approachable, conversational.
- Persuasive: Compelling, action-oriented, inspiring, persuasive language.
- Academic: Formal, objective, well-structured, sophisticated vocabulary.
- Concise: Direct, zero fluff, straight to the point, impactful.

Return a JSON object ONLY with the following structure:
{
  "toneAdjustedText": "The text adapted to the specified tone",
  "highlights": ["What changed to achieve this tone"]
}
Original text:
${text}`;
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("Empty response from Gemini API");

  const parsed = JSON.parse(rawText.trim());
  if (action === "grammar") {
    return {
      output: parsed.correctedText || text,
      suggestions: parsed.suggestions || [],
    };
  } else if (action === "rewrite") {
    return {
      output: parsed.rewrittenText || text,
      suggestions: parsed.improvements?.map((imp) => ({ issue: imp })) || [],
    };
  } else {
    return {
      output: parsed.toneAdjustedText || text,
      suggestions: parsed.highlights?.map((h) => ({ issue: h })) || [],
    };
  }
}

// Built-in Intelligent NLP Engine (Instant, Offline, Zero-Latency)
function processLocalNLP({ action, text, tone, rewriteStyle }) {
  if (action === "grammar") {
    return runLocalGrammarCheck(text);
  } else if (action === "rewrite") {
    return runLocalParaphraser(text, rewriteStyle);
  } else if (action === "tone") {
    return runLocalToneChanger(text, tone);
  }
  return { success: true, output: text, engine: "smart-nlp" };
}

function runLocalGrammarCheck(text) {
  let corrected = text;
  const suggestions = [];

  const commonGrammarRules = [
    // Double words (e.g. "the the")
    {
      regex: /\b([a-zA-Z]+)\s+\1\b/gi,
      replace: "$1",
      explain: "Repeated duplicate word",
    },
    // Common spelling mistakes
    { regex: /\bteh\b/gi, replace: "the", explain: "Typo: 'teh' -> 'the'" },
    { regex: /\brecieve\b/gi, replace: "receive", explain: "Spelling: 'i' before 'e' exception" },
    { regex: /\bseperate\b/gi, replace: "separate", explain: "Spelling: 'seperate' -> 'separate'" },
    { regex: /\bdefinately\b/gi, replace: "definitely", explain: "Spelling: 'definately' -> 'definitely'" },
    { regex: /\buntill\b/gi, replace: "until", explain: "Spelling: 'untill' -> 'until'" },
    { regex: /\bwierd\b/gi, replace: "weird", explain: "Spelling: 'wierd' -> 'weird'" },
    { regex: /\boccured\b/gi, replace: "occurred", explain: "Spelling: double 'r' in 'occurred'" },
    { regex: /\baccomodate\b/gi, replace: "accommodate", explain: "Spelling: 'accommodate'" },
    { regex: /\bgoverment\b/gi, replace: "government", explain: "Spelling: 'government'" },
    { regex: /\benviroment\b/gi, replace: "environment", explain: "Spelling: 'environment'" },
    // A vs An
    { regex: /\ba\s+([aeiou][a-z]+)/gi, replace: "an $1", explain: "Use 'an' before vowels" },
    { regex: /\ban\s+([bcdfghjklmnpqrstvwxyz][a-z]+)/gi, replace: "a $1", explain: "Use 'a' before consonants" },
    // Their / There / They're common patterns
    { regex: /\btheir\s+(going|doing|coming|making|ready)\b/gi, replace: "they're $1", explain: "Contraction 'they are' needed" },
    { regex: /\bthere\s+(car|house|work|decision|team|code)\b/gi, replace: "their $1", explain: "Possessive pronoun 'their' needed" },
    { regex: /\byour\s+(welcome|right|wrong|late|early)\b/gi, replace: "you're $1", explain: "Contraction 'you are' needed" },
    // Punctuation and spacing
    { regex: /\s+([.,!?;:])/g, replace: "$1", explain: "Remove unwanted space before punctuation" },
    { regex: /([.,!?;:])([a-zA-Z])/g, replace: "$1 $2", explain: "Add space after punctuation" },
    // Capitalize first letter of sentences
    {
      regex: /(^|[.!?]\s+)([a-z])/g,
      custom: (match, p1, p2) => `${p1}${p2.toUpperCase()}`,
      explain: "Capitalize the first letter of each sentence",
    },
    // Passive voice simplification
    { regex: /\bis\s+able\s+to\b/gi, replace: "can", explain: "Concise phrasing: 'can'" },
    { regex: /\bin\s+order\s+to\b/gi, replace: "to", explain: "Concise phrasing: 'to'" },
    { regex: /\bdue\s+to\s+the\s+fact\s+that\b/gi, replace: "because", explain: "Concise phrasing: 'because'" },
  ];

  commonGrammarRules.forEach((rule) => {
    if (rule.custom) {
      if (rule.regex.test(corrected)) {
        corrected = corrected.replace(rule.regex, rule.custom);
        suggestions.push({
          issue: rule.explain,
          original: "Sentence start",
          replacement: "Capitalized",
        });
      }
    } else if (rule.regex.test(corrected)) {
      const match = corrected.match(rule.regex);
      if (match) {
        suggestions.push({
          issue: rule.explain,
          original: match[0],
          replacement: rule.replace,
        });
        corrected = corrected.replace(rule.regex, rule.replace);
      }
    }
  });

  // Ensure ending period if none
  if (corrected.trim().length > 0 && !/[.!?]$/.test(corrected.trim())) {
    corrected = corrected.trim() + ".";
    suggestions.push({
      issue: "Added sentence-ending period",
      original: "End of text",
      replacement: ".",
    });
  }

  return {
    success: true,
    output: corrected,
    suggestions,
    engine: "smart-nlp",
  };
}

function runLocalParaphraser(text, style = "fluent") {
  const synonyms = {
    help: ["assist", "empower", "facilitate", "support"],
    create: ["craft", "generate", "build", "produce", "develop"],
    improve: ["enhance", "elevate", "optimize", "refine", "boost"],
    fast: ["swift", "rapid", "expedited", "seamless", "high-speed"],
    good: ["exceptional", "high-quality", "outstanding", "superior"],
    important: ["vital", "crucial", "essential", "paramount", "key"],
    use: ["leverage", "utilize", "harness", "employ", "adopt"],
    show: ["demonstrate", "illustrate", "exhibit", "highlight"],
    start: ["initiate", "kick off", "commence", "embark on"],
    change: ["transform", "modify", "adapt", "evolve"],
    big: ["substantial", "extensive", "significant", "monumental"],
    hard: ["challenging", "complex", "demanding", "rigorous"],
  };

  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .filter((s) => s.trim().length > 0);

  const rewritten = sentences.map((sentence) => {
    let s = sentence;
    if (style === "fluent") {
      s = s.replace(/\b(very|really|actually|basically)\s+/gi, "");
      s = s.replace(/\b(a lot of|lots of)\b/gi, "numerous");
      s = s.replace(/\b(make sure)\b/gi, "ensure");
    } else if (style === "creative") {
      s = s.replace(/\b(good|great)\b/gi, "exceptional");
      s = s.replace(/\b(change)\b/gi, "transform");
      s = s.replace(/\b(create)\b/gi, "craft");
    } else if (style === "concise") {
      s = s.replace(/\b(in order to)\b/gi, "to");
      s = s.replace(/\b(at this point in time)\b/gi, "now");
      s = s.replace(/\b(with regard to)\b/gi, "regarding");
      s = s.replace(/\b(due to the fact that)\b/gi, "because");
    }

    // Apply synonym replacements
    Object.entries(synonyms).forEach(([word, list]) => {
      const reg = new RegExp(`\\b${word}\\b`, "i");
      if (reg.test(s)) {
        const replacement = list[Math.floor(Math.random() * list.length)];
        s = s.replace(reg, replacement);
      }
    });

    return s;
  });

  return {
    success: true,
    output: rewritten.join(" "),
    suggestions: [
      { issue: `Enhanced flow & vocabulary (${style} style)` },
      { issue: "Eliminated word redundancy and fillers" },
    ],
    engine: "smart-nlp",
  };
}

function runLocalToneChanger(text, tone) {
  let result = text;
  const toneNotes = [];

  switch (tone) {
    case "Professional":
      result = result
        .replace(/\bhey\b/gi, "Dear colleague")
        .replace(/\bhi\b/gi, "Greetings")
        .replace(/\bthanks\b/gi, "Thank you very much")
        .replace(/\bgonna\b/gi, "going to")
        .replace(/\bwanna\b/gi, "would like to")
        .replace(/\bkinda\b/gi, "somewhat")
        .replace(/\bya\b/gi, "you")
        .replace(/\bcool\b/gi, "satisfactory")
        .replace(/\basap\b/gi, "at your earliest convenience")
        .replace(/\blet me know\b/gi, "please keep me informed");
      toneNotes.push({ issue: "Polished to corporate, respectful professional phrasing." });
      break;

    case "Casual":
      result = result
        .replace(/\bDear sir or madam\b/gi, "Hey there")
        .replace(/\bGreetings\b/gi, "Hey")
        .replace(/\bThank you very much\b/gi, "Thanks a bunch")
        .replace(/\bat your earliest convenience\b/gi, "whenever you get a chance")
        .replace(/\bI would like to inform you that\b/gi, "Just wanted to let you know that")
        .replace(/\bfacilitate\b/gi, "help out with")
        .replace(/\butilize\b/gi, "use");
      toneNotes.push({ issue: "Converted to warm, friendly, conversational tone." });
      break;

    case "Persuasive":
      result = result
        .replace(/\bI think\b/gi, "We are confident that")
        .replace(/\bmaybe\b/gi, "undoubtedly")
        .replace(/\bcan help\b/gi, "will dramatically accelerate")
        .replace(/\bgood\b/gi, "game-changing")
        .replace(/\bnew\b/gi, "cutting-edge")
        .replace(/\btry it\b/gi, "unlock your full potential today");
      if (!result.includes("!")) {
        result = result.replace(/\.$/, " — discover the difference today!");
      }
      toneNotes.push({ issue: "Enhanced with compelling value hooks and urgency." });
      break;

    case "Academic":
      result = result
        .replace(/\bI think\b/gi, "Evidence indicates that")
        .replace(/\ba lot\b/gi, "a substantial quantity")
        .replace(/\bshows\b/gi, "empirically demonstrates")
        .replace(/\bbig\b/gi, "statistically significant")
        .replace(/\blike\b/gi, "such as")
        .replace(/\babout\b/gi, "approximately");
      toneNotes.push({ issue: "Framed with formal scholarly lexicon and objectivity." });
      break;

    case "Concise":
      result = result
        .replace(/\b(in order to)\b/gi, "to")
        .replace(/\b(due to the fact that)\b/gi, "because")
        .replace(/\b(at the present moment)\b/gi, "currently")
        .replace(/\b(it is important to note that)\b/gi, "")
        .replace(/\b(basically|literally|actually|really)\s+/gi, "")
        .replace(/\s+/g, " ")
        .trim();
      toneNotes.push({ issue: "Trimmed fluff words and condensed to core message." });
      break;

    default:
      break;
  }

  return {
    success: true,
    output: result,
    suggestions: toneNotes,
    engine: "smart-nlp",
  };
}

export function computeTextMetrics(text) {
  if (!text || !text.trim()) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeSeconds: 0,
      gradeLevel: "0",
    };
  }

  const trimmed = text.trim();
  const words = trimmed.match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  const characters = trimmed.length;
  const charactersNoSpaces = trimmed.replace(/\s+/g, "").length;
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1;
  const paragraphs = trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length || 1;

  // Reading time (average 200 words per minute)
  const readingTimeSeconds = Math.max(1, Math.round((wordCount / 200) * 60));

  // Approximate Coleman-Liau Readability Index: 0.0588 * L - 0.296 * S - 15.8
  const L = (charactersNoSpaces / wordCount) * 100;
  const S = (sentences / wordCount) * 100;
  let gradeIndex = 0.0588 * L - 0.296 * S - 15.8;
  gradeIndex = Math.max(1, Math.min(16, Math.round(gradeIndex)));

  return {
    words: wordCount,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeSeconds,
    gradeLevel: gradeIndex > 12 ? "College Level" : `Grade ${gradeIndex}`,
  };
}
