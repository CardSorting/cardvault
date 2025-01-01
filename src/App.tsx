import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { AuthGuard } from "@/lib/auth/AuthGuard";
import LoginPage from "@/components/auth/LoginPage";
import LandingPage from "@/components/landing/LandingPage";
import BattleArena from "@/components/battle/BattleArena";
import DeckBuilder from "@/components/battle/DeckBuilder";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes */}
              <Route
                path="/battle"
                element={
                  <AuthGuard>
                    <BattleArena />
                  </AuthGuard>
                }
              />
              <Route
                path="/deck"
                element={
                  <AuthGuard>
                    <DeckBuilder />
                  </AuthGuard>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
