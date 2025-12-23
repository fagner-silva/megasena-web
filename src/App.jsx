import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CreateGame } from "./pages/CreateGame";
import { Games } from "./pages/Games";
import { CreateDraw } from "./pages/CreateDraw";
import { CheckResults } from "./pages/CheckResults";

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateGame />} />
        <Route path="/jogos" element={<Games />} />
        <Route path="/sorteio" element={<CreateDraw />} />
        <Route path="/conferir" element={<CheckResults />} />
      </Routes>
    </div>
  );
}
