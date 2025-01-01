import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Swords, ScrollText, Trophy, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, signIn, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white font-bold text-xl"
            >
              <Sparkles className="h-6 w-6 text-purple-400" />
              CardCraft
            </button>

            {user && (
              <nav className="hidden md:flex gap-6">
                <Button
                  variant="link"
                  className={`text-sm ${location.pathname === "/battle" ? "text-purple-400" : "text-gray-300"}`}
                  onClick={() => navigate("/battle")}
                >
                  <Swords className="w-4 h-4 mr-2" />
                  Battle Arena
                </Button>
                <Button
                  variant="link"
                  className={`text-sm ${location.pathname === "/deck" ? "text-purple-400" : "text-gray-300"}`}
                  onClick={() => navigate("/deck")}
                >
                  <ScrollText className="w-4 h-4 mr-2" />
                  Deck Builder
                </Button>
              </nav>
            )}
          </div>

          {/* Player Stats & Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">
                      Level {profile?.level || 1}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    BP: {profile?.battle_points || 0}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:text-white"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => signIn()}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
