import React from "react";
import { Badge } from "@/components/ui/badge";
import { Trophy, Sparkles } from "lucide-react";

interface BattleScoreProps {
  playerScore: number;
  opponentScore: number;
  playerDeckCount: number;
  opponentDeckCount: number;
  wonCardsCount: number;
}

export const BattleScore: React.FC<BattleScoreProps> = ({
  playerScore,
  opponentScore,
  playerDeckCount,
  opponentDeckCount,
  wonCardsCount,
}) => (
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 text-glow-purple">
      War Card Game
    </h1>
    <div className="flex justify-center gap-8 text-xl">
      <div className="flex items-center gap-4 glass-effect px-6 py-3 rounded-lg card-shadow">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-400 animate-bounce" />
          <span className="text-purple-400 font-bold text-glow">
            {playerScore}
          </span>
          <span className="text-gray-400">vs</span>
          <span className="text-red-400 font-bold text-glow">
            {opponentScore}
          </span>
        </div>
      </div>
    </div>
    <div className="flex justify-center gap-4 mt-4">
      <Badge variant="outline" className="glass-effect animate-float">
        Your deck: {playerDeckCount}
      </Badge>
      <Badge variant="outline" className="glass-effect animate-float">
        Opponent's deck: {opponentDeckCount}
      </Badge>
      {wonCardsCount > 0 && (
        <Badge
          variant="outline"
          className="bg-green-900/50 animate-float sparkle-effect"
        >
          <Sparkles className="w-3 h-3 mr-1 text-yellow-400" />
          Cards won: {wonCardsCount}
        </Badge>
      )}
    </div>
  </div>
);
