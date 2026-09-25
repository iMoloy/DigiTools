import React, { useState } from "react";
import { toast } from "react-toastify";
import { Check, ShoppingBag, Search, Sparkles, Filter } from "lucide-react";
import Cart from "./Cart";

const Tools = ({ tools, activeTab, setActiveTab, cartItems, setCartItems }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const handleAddToCart = (tool) => {
    const isExist = cartItems.find((item) => item.id === tool.id);
    if (isExist) {
      toast.warning("Product is already in your cart!");
    } else {
      setCartItems([...cartItems, tool]);
      toast.success(`${tool.name} added to cart!`);
    }
  };

  const filteredTools = tools.filter((tool) => {
    const matchSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = selectedTag === "all" || tool.tagType === selectedTag;
    return matchSearch && matchTag;
  });

  return (
    <section id="marketplace" className="w-11/12 mt-16 mx-auto scroll-mt-24">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <ShoppingBag className="w-3.5 h-3.5" />
          Software & Asset Catalog
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Premium Digital Subscriptions
        </h2>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
          Choose from our curated collection of verified software licenses and templates to accelerate your creation.
        </p>

        {/* View Switcher Pills: Products vs Cart */}
        <div className="inline-flex p-1.5 rounded-full bg-slate-950/80 border border-slate-800 backdrop-blur-xl mt-6">
          <button
            onClick={() => setActiveTab("tool")}
            className={`px-6 py-2 rounded-full text-xs md:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "tool"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Products ({tools.length})
          </button>
          <button
            onClick={() => setActiveTab("cart")}
            className={`px-6 py-2 rounded-full text-xs md:text-sm font-bold transition flex items-center gap-2 ${
              activeTab === "cart"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Shopping Cart ({cartItems.length})
          </button>
        </div>
      </div>

      <div className="mt-10 mb-20">
        {activeTab === "tool" ? (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools or software..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Tag filters */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {["all", "Popular", "Best Seller", "New"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      selectedTag === tag
                        ? "bg-indigo-600/30 border border-indigo-500 text-indigo-300"
                        : "bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {tag === "all" ? "All Tags" : tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const isAdded = cartItems.some((item) => item.id === tool.id);

                return (
                  <div
                    key={tool.id}
                    className="group rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/40 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top Bar with Icon & Tag */}
                      <div className="flex justify-between items-center">
                        <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-slate-800 p-2.5 flex items-center justify-center group-hover:scale-110 transition duration-300">
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                        <span
                          className={`badge badge-sm font-bold text-xs py-2.5 px-3 rounded-full border ${
                            tool.tagType === "Best Seller"
                              ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                              : tool.tagType === "New"
                              ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                              : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                          }`}
                        >
                          {tool.tagType}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="text-xl font-black text-white group-hover:text-indigo-300 transition">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1.5 whitespace-pre-line leading-relaxed">
                          {tool.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 py-1">
                        <span className="text-3xl font-extrabold text-white">
                          ${tool.price}
                        </span>
                        <span className="text-xs text-slate-500">
                          /{tool.period === "Monthly" ? "mo" : "yr"}
                        </span>
                      </div>

                      {/* Features List */}
                      <ul className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                        {tool.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6">
                      <button
                        onClick={() => handleAddToCart(tool)}
                        disabled={isAdded}
                        className={`w-full py-3 rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 ${
                          isAdded
                            ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-default"
                            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 active:scale-95"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </section>
  );
};

export default Tools;
