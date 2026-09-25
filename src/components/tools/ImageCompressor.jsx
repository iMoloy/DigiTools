import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Download,
  Trash2,
  RefreshCw,
  Sliders,
  Maximize2,
  CheckCircle,
  FileCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";

const SAMPLE_IMAGE_URL =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop";

const ImageCompressor = () => {
  const [originalUrl, setOriginalUrl] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [compressedBlob, setCompressedBlob] = useState(null);

  // Compression Settings
  const [quality, setQuality] = useState(75); // 10 to 100
  const [format, setFormat] = useState("image/webp"); // "image/webp" | "image/jpeg" | "image/png"
  const [scale, setScale] = useState(100); // 25, 50, 75, 100%

  // Dimensions & sizes
  const [origInfo, setOrigInfo] = useState({ size: 0, width: 0, height: 0, name: "" });
  const [compInfo, setCompInfo] = useState({ size: 0, width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);

  // Helper to format bytes
  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Perform compression via HTML5 Canvas
  const processImage = React.useCallback(
    (imgElement) => {
      setIsProcessing(true);
      try {
        const origW = imgElement.naturalWidth || imgElement.width;
        const origH = imgElement.naturalHeight || imgElement.height;

        const targetScale = scale / 100;
        const targetW = Math.max(1, Math.round(origW * targetScale));
        const targetH = Math.max(1, Math.round(origH * targetScale));

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");

        // Draw with smooth interpolation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // If converting to jpeg, fill white background first to handle transparent PNGs nicely
        if (format === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, targetW, targetH);
        }

        ctx.drawImage(imgElement, 0, 0, targetW, targetH);

        const mimeQuality = format === "image/png" ? undefined : quality / 100;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              toast.error("Compression failed on this image.");
              setIsProcessing(false);
              return;
            }

            if (compressedUrl) {
              URL.revokeObjectURL(compressedUrl);
            }

            const newUrl = URL.createObjectURL(blob);
            setCompressedUrl(newUrl);
            setCompressedBlob(blob);
            setCompInfo({
              size: blob.size,
              width: targetW,
              height: targetH,
            });
            setIsProcessing(false);
          },
          format,
          mimeQuality
        );
      } catch (err) {
        console.error("Canvas compression error:", err);
        toast.error("Error processing image.");
        setIsProcessing(false);
      }
    },
    [scale, format, quality, compressedUrl]
  );

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.warning("Please upload a valid image file (PNG, JPG, WebP, etc.)");
      return;
    }

    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOrigInfo({
        size: file.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
        name: file.name,
      });
      processImage(img);
    };
  };

  // Re-run compression when settings change
  useEffect(() => {
    if (originalUrl) {
      const img = new Image();
      img.src = originalUrl;
      img.onload = () => {
        processImage(img);
      };
    }
  }, [originalUrl, processImage]);

  const handleDownload = () => {
    if (!compressedBlob) return;
    const ext = format === "image/webp" ? "webp" : format === "image/png" ? "png" : "jpg";
    const originalName = origInfo.name ? origInfo.name.replace(/\.[^/.]+$/, "") : "digitools-image";
    const fileName = `compressed-${originalName}.${ext}`;

    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded ${fileName}!`);
  };

  const handleLoadDemoImage = async () => {
    try {
      setIsProcessing(true);
      const res = await fetch(SAMPLE_IMAGE_URL);
      const blob = await res.blob();
      const file = new File([blob], "abstract-art.jpg", { type: "image/jpeg" });
      handleFileSelect(file);
    } catch {
      toast.error("Could not load demo image. Try uploading one!");
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setCompressedBlob(null);
    setOrigInfo({ size: 0, width: 0, height: 0, name: "" });
    setCompInfo({ size: 0, width: 0, height: 0 });
  };

  // Calculate savings percentage
  const savedBytes = origInfo.size - compInfo.size;
  const savingsPercent =
    origInfo.size > 0 && compInfo.size > 0
      ? Math.max(0, ((savedBytes / origInfo.size) * 100)).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white flex items-center gap-2">
              Client-Side Image Compressor & Converter
              <span className="badge badge-sm bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                100% Private
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Shrink file size up to 90% and convert between WebP, PNG, and JPEG right in your browser
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!originalUrl && (
            <button
              onClick={handleLoadDemoImage}
              className="btn btn-xs btn-outline border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              Try Demo Image
            </button>
          )}

          {originalUrl && (
            <button
              onClick={handleReset}
              className="btn btn-xs btn-ghost text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {!originalUrl ? (
        /* Upload Drag & Drop Zone */
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileSelect(e.dataTransfer.files[0]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-700/80 hover:border-emerald-500/80 rounded-3xl p-12 text-center bg-slate-950/40 hover:bg-slate-900/40 transition-all cursor-pointer group backdrop-blur-xl shadow-xl"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            accept="image/*"
            className="hidden"
          />

          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition duration-300">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h4 className="text-lg font-bold text-white mb-1">
            Drag & Drop your image here, or{" "}
            <span className="text-emerald-400 underline decoration-dotted">Browse Files</span>
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Supports PNG, JPEG, WebP, GIF, SVG. Compressed client-side inside your browser for zero latency and total data privacy.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="badge badge-sm bg-slate-900 text-slate-400 border-slate-800">
              WebP Conversion
            </span>
            <span className="badge badge-sm bg-slate-900 text-slate-400 border-slate-800">
              Quality Slider
            </span>
            <span className="badge badge-sm bg-slate-900 text-slate-400 border-slate-800">
              Dimension Rescaling
            </span>
          </div>
        </div>
      ) : (
        /* Active Processing & Live Side-by-Side Interface */
        <div className="space-y-6">
          {/* Settings Control Bar */}
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/90 backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
            {/* Format Selector */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                Target Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "image/webp", label: "WebP", desc: "Best size" },
                  { id: "image/jpeg", label: "JPEG", desc: "Universal" },
                  { id: "image/png", label: "PNG", desc: "Lossless" },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setFormat(fmt.id)}
                    className={`p-2 rounded-xl text-center border text-xs font-bold transition ${
                      format === fmt.id
                        ? "bg-emerald-600/30 border-emerald-500 text-white shadow-md shadow-emerald-500/20 ring-1 ring-emerald-500"
                        : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <div>{fmt.label}</div>
                    <div className="text-[10px] font-normal text-slate-400">{fmt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Quality: {quality}%
                </label>
                <span className="text-xs text-emerald-400 font-semibold">
                  {quality > 85 ? "Maximum" : quality > 60 ? "Balanced (Recommended)" : "Aggressive"}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                disabled={format === "image/png"}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="range range-xs range-accent w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>10% (Smallest)</span>
                <span>80% (Optimal)</span>
                <span>100% (Lossless)</span>
              </div>
            </div>

            {/* Dimension Rescaling Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Dimensions: {scale}%
                </label>
                <span className="text-xs text-slate-400">
                  {compInfo.width} × {compInfo.height} px
                </span>
              </div>
              <div className="flex gap-2">
                {[100, 75, 50, 25].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      scale === s
                        ? "bg-emerald-600/30 border-emerald-500 text-white"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {s}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Comparison Cards & Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Card */}
            <div className="rounded-2xl bg-slate-900/50 border border-slate-800/90 overflow-hidden flex flex-col shadow-xl">
              <div className="px-4 py-3 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 uppercase tracking-wider">
                  Original Image
                </span>
                <span className="badge badge-sm bg-slate-800 text-slate-300 border-none font-semibold">
                  {formatBytes(origInfo.size)}
                </span>
              </div>

              <div className="p-4 flex-1 flex items-center justify-center bg-black/40 min-h-[260px]">
                <img
                  src={originalUrl}
                  alt="Original"
                  className="max-h-60 max-w-full object-contain rounded-lg shadow-md"
                />
              </div>

              <div className="px-4 py-2.5 bg-slate-950/30 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
                <span>Resolution: {origInfo.width} × {origInfo.height} px</span>
                <span className="truncate max-w-[160px]">{origInfo.name}</span>
              </div>
            </div>

            {/* Compressed Card */}
            <div className="rounded-2xl bg-slate-900/50 border border-slate-800/90 overflow-hidden flex flex-col shadow-xl ring-1 ring-emerald-500/30">
              <div className="px-4 py-3 bg-slate-950/50 border-b border-slate-800 flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Compressed Output
                </span>
                <div className="flex items-center gap-2">
                  {savingsPercent > 0 && (
                    <span className="badge badge-sm bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold">
                      -{savingsPercent}% Saved
                    </span>
                  )}
                  <span className="badge badge-sm bg-indigo-950 text-indigo-300 border-indigo-700/50 font-semibold">
                    {formatBytes(compInfo.size)}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex items-center justify-center bg-black/40 min-h-[260px] relative">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-400">
                    <RefreshCw className="w-7 h-7 animate-spin" />
                    <span className="text-xs font-semibold">Compressing canvas...</span>
                  </div>
                ) : (
                  <img
                    src={compressedUrl}
                    alt="Compressed"
                    className="max-h-60 max-w-full object-contain rounded-lg shadow-md"
                  />
                )}
              </div>

              <div className="px-4 py-3 bg-slate-950/40 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Reduced from <strong className="text-slate-300">{formatBytes(origInfo.size)}</strong> to{" "}
                  <strong className="text-emerald-400">{formatBytes(compInfo.size)}</strong>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={!compressedBlob || isProcessing}
                  className="btn btn-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none rounded-xl px-5 shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;
