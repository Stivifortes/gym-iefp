import { useState } from "react";

import "./App.css";
import RecuperaSenha from "./pages/recuperaSenha";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RecuperaSenha />
    </>
  );
}

export default App;
