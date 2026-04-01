import { useState, useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tools from "./components/Tools";

function App() {
  const [activeTab, setActiveTab] = useState("tool");
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Tools tools={tools} activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
}

export default App;
