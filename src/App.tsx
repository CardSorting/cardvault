import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import BattleArena from "./components/battle/BattleArena";
import DeckBuilder from "./components/battle/DeckBuilder";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/battle" element={<BattleArena />} />
            <Route path="/deck" element={<DeckBuilder />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
