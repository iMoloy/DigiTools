import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tools from "./components/Tools";

function App() {
  const [activeTab, setActiveTab] = useState("tool");
  const [tools, setTools] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Navbar cartItems={cartItems} />
      <Hero />
      <Tools
        tools={tools}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
