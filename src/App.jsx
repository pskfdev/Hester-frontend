import { useState } from "react";
import "./App.css";
import Navbar from "../src/components/navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="static">
      <Navbar />

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button class="btn">Button</button>
    </div>
  );
}

export default App;
