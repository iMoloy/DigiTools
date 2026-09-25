// Code Formatter, Beautifier & Minifier Utility
// Supports HTML, CSS, JavaScript, and JSON with configurable indentation

export function formatCode(code, language, indentSize = 2) {
  if (!code || !code.trim()) {
    return { success: true, formatted: "", error: null };
  }

  const indentStr = " ".repeat(indentSize);

  try {
    switch (language.toLowerCase()) {
      case "json":
        return formatJson(code, indentSize);

      case "css":
        return { success: true, formatted: formatCss(code, indentStr), error: null };

      case "html":
        return { success: true, formatted: formatHtml(code, indentStr), error: null };

      case "javascript":
      case "js":
        return { success: true, formatted: formatJs(code, indentStr), error: null };

      default:
        return { success: true, formatted: code, error: null };
    }
  } catch (err) {
    return {
      success: false,
      formatted: code,
      error: err.message || "Failed to format code.",
    };
  }
}

export function minifyCode(code, language) {
  if (!code || !code.trim()) {
    return { success: true, minified: "", savings: 0 };
  }

  const originalLength = code.length;
  let minified = "";

  try {
    switch (language.toLowerCase()) {
      case "json":
        minified = JSON.stringify(JSON.parse(code));
        break;

      case "css":
        minified = code
          .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
          .replace(/\s+/g, " ") // collapse whitespace
          .replace(/\s*([{};:,])\s*/g, "$1") // remove space around separators
          .replace(/;}/g, "}") // remove trailing semicolons
          .trim();
        break;

      case "html":
        minified = code
          .replace(/<!--[\s\S]*?-->/g, "") // remove comments
          .replace(/>\s+</g, "><") // collapse space between tags
          .replace(/\s{2,}/g, " ") // collapse multiple spaces
          .trim();
        break;

      case "javascript":
      case "js":
        minified = code
          .replace(/\/\*[\s\S]*?\*\//g, "") // multi-line comments
          .replace(/(^|[^:])\/\/[^\n]*/g, "$1") // single-line comments (except URLs)
          .replace(/\s+/g, " ")
          .replace(/\s*([=+\-*/%&|^!<>?:;,{}()[\]])\s*/g, "$1")
          .trim();
        break;

      default:
        minified = code.replace(/\s+/g, " ").trim();
    }

    const savedChars = originalLength - minified.length;
    const savingsPercent = originalLength > 0 ? ((savedChars / originalLength) * 100).toFixed(1) : 0;

    return {
      success: true,
      minified,
      savings: savingsPercent,
      savedChars,
    };
  } catch (err) {
    return {
      success: false,
      minified: code,
      error: err.message || "Failed to minify code.",
      savings: 0,
    };
  }
}

function formatJson(code, indentSize) {
  try {
    const parsed = JSON.parse(code);
    return {
      success: true,
      formatted: JSON.stringify(parsed, null, indentSize),
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      formatted: code,
      error: `Invalid JSON syntax: ${err.message}`,
    };
  }
}

function formatCss(code, indentStr) {
  // Strip existing excessive whitespace
  let clean = code
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.trim())
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;/g, ";\n")
    .replace(/{/g, " {\n")
    .replace(/}/g, "\n}\n");

  const lines = clean.split("\n");
  let depth = 0;
  const formattedLines = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.includes("}")) {
      depth = Math.max(0, depth - 1);
    }

    const indentedLine = indentStr.repeat(depth) + line;

    // Add space after colon in CSS property declarations
    const beautified = indentedLine.replace(/:\s*([^;]+);/, ": $1;");
    formattedLines.push(beautified);

    if (line.includes("{")) {
      depth++;
    }
  }

  return formattedLines.join("\n");
}

function formatHtml(code, indentStr) {
  // Simple, robust HTML Indenter
  const clean = code
    .replace(/<!--[\s\S]*?-->/g, (m) => m)
    .replace(/>\s*</g, ">\n<")
    .trim();

  const lines = clean.split("\n");
  let depth = 0;
  const formattedLines = [];

  const selfClosingRegex = /<area|<base|<br|<col|<embed|<hr|<img|<input|<link|<meta|<param|<source|<track|<wbr|\/>/i;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    const isClosing = /^<\//.test(line);
    const isOpening = /^<[^/!][^>]*>/.test(line);
    const isSelfClosing = selfClosingRegex.test(line);

    if (isClosing) {
      depth = Math.max(0, depth - 1);
    }

    formattedLines.push(indentStr.repeat(depth) + line);

    if (isOpening && !isSelfClosing && !line.includes("</")) {
      depth++;
    }
  }

  return formattedLines.join("\n");
}

function formatJs(code, indentStr) {
  // Formats JS tokens, bracket depths, indentation
  let depth = 0;
  const lines = code.split("\n");
  const result = [];

  for (let rawLine of lines) {
    let line = rawLine.trim();
    if (!line) {
      result.push("");
      continue;
    }

    // Check closing brace at start
    if (/^[}\])]/.test(line)) {
      depth = Math.max(0, depth - 1);
    }

    // Space operators and punctuation nicely
    let formatted = indentStr.repeat(depth) + line;

    result.push(formatted);

    // Increase depth if line ends with { or [
    if (/[{[(]$/.test(line)) {
      depth++;
    } else if (/[}\])]$/.test(line) && !/^[}\])]/.test(line)) {
      depth = Math.max(0, depth - 1);
    }
  }

  return result.join("\n");
}

export const SAMPLE_CODE_SNIPPETS = {
  javascript: `// DigiTools Interactive JavaScript Demo
async function fetchDigitalAssets(category = "all") {
  const endpoint = "https://api.digitools.dev/assets";
  try {
    const response = await fetch(\`\${endpoint}?cat=\${category}\`);
    if (!response.ok) throw new Error("Network response was not ok");
    const { data, total } = await response.json();
    console.log(\`Successfully loaded \${total} assets!\`);
    return data.map(item => ({
      id: item.id,
      title: item.title,
      price: Number(item.price).toFixed(2),
      isAvailable: Boolean(item.stock > 0)
    }));
  } catch (error) {
    console.error("Asset fetch failure:", error.message);
    return [];
  }
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DigiTools - Premium Suite</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body class="bg-slate-900 text-white">
  <header class="navbar backdrop-blur-md">
    <div class="container mx-auto flex justify-between p-4">
      <h1 class="text-xl font-bold">DigiTools</h1>
      <button class="btn btn-primary rounded-full">Launch Tools</button>
    </div>
  </header>
  <main class="py-12">
    <section class="text-center">
      <h2 class="text-4xl font-extrabold">Next-Gen Digital Utilities</h2>
      <p class="mt-4 text-slate-400">Transform your workflow with in-browser power.</p>
    </section>
  </main>
</body>
</html>`,

  css: `/* DigiTools Glassmorphic Theme Palette */
:root {
  --glass-bg: rgba(15, 23, 42, 0.75);
  --glass-border: rgba(255, 255, 255, 0.08);
  --accent-cyan: #06b6d4;
  --accent-violet: #8b5cf6;
}

.glass-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(16px);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.glow-btn:hover {
  box-shadow: 0 0 25px rgba(139, 92, 246, 0.6);
  transform: translateY(-2px);
  transition: all 0.3s ease-in-out;
}`,

  json: `{
  "suite": "DigiTools",
  "version": "2.5.0",
  "developer": "Moloy Krishna Paul",
  "features": [
    {
      "id": "ai-text",
      "name": "AI Text Suite",
      "tools": ["Grammar Check", "Text Rewriter", "Tone Changer"],
      "enabled": true
    },
    {
      "id": "img-compress",
      "name": "Image Compressor & Converter",
      "supportedFormats": ["WEBP", "PNG", "JPEG"],
      "qualityRange": [10, 100],
      "enabled": true
    },
    {
      "id": "code-beautifier",
      "name": "Code Beautifier & Syntax Highlighter",
      "languages": ["HTML", "CSS", "JavaScript", "JSON"],
      "minifySupport": true,
      "enabled": true
    }
  ],
  "settings": {
    "theme": "glassmorphism-dark",
    "offlineCapable": true,
    "geminiPowered": true
  }
}`,
};
