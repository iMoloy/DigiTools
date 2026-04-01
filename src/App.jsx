import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Tools from "./components/Tools";

const getTools = async () => {
  const res = await fetch("../public/tools.json");
  return res.json();
};

const toolsPromise = getTools();

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Tools toolsPromise={toolsPromise} />
    </>
  );
}

export default App;
