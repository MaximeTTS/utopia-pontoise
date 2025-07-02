import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Film from "./pages/Film";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film" element={<Film />} />
      </Routes>
    </BrowserRouter>
  );
}
