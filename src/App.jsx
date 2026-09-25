import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UtilitiesWorkspace from "./components/tools/UtilitiesWorkspace";
import Tools from "./components/Tools";
import Steps from "./components/Steps";
import Pricing from "./components/Pricing";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

function App() {
  const [activeTab, setActiveTab] = useState("tool");
  const [tools, setTools] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((error) => console.error("Error fetching tools data:", error));
  }, []);

  const handleOpenCart = () => {
    setActiveTab("cart");
    const marketplaceElem = document.getElementById("marketplace");
    if (marketplaceElem) {
      marketplaceElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar cartItems={cartItems} onOpenCart={handleOpenCart} />
        <Hero />
        <UtilitiesWorkspace />
        <Tools
          tools={tools}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
        <Steps />
        <Pricing />
        <Banner />
      </div>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="dark"
        toastClassName="bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl rounded-2xl"
      />
    </div>
  );
}

export default App;
