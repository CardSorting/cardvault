import React from "react";
import { Button } from "@/components/ui/button";
import { Swords, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BattleActions } from "@/lib/battle/types";

interface BattleControlsProps {
  actions: BattleActions;
  isWar: boolean;
  isAnimating: boolean;
  gameOver: boolean;
}

export const BattleControls: React.FC<BattleControlsProps> = ({
  actions,
  isWar,
  isAnimating,
  gameOver,
}) => (
  <div className="flex gap-4">
    <Button
      size="lg"
      className={cn(
        "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
        isAnimating && "opacity-50 cursor-not-allowed",
        gameOver && "hidden",
      )}
      onClick={isWar ? actions.resolveWar : actions.drawCards}
      disabled={isAnimating || gameOver}
    >
      <Swords className="w-6 h-6 mr-2" />
      {isWar ? "Fight War!" : "Draw Cards"}
    </Button>

    <Button
      size="lg"
      variant="outline"
      className={cn(
        "border-purple-500/50 hover:bg-purple-900/20",
        (isAnimating || isWar || gameOver) && "hidden",
      )}
      onClick={actions.shuffleDeck}
      disabled={isAnimating || isWar || gameOver}
    >
      <Shuffle className="w-6 h-6 mr-2" />
      Shuffle Decks
    </Button>

    {gameOver && (
      <Button
        size="lg"
        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        onClick={actions.resetGame}
      >
        Play Again
      </Button>
    )}
  </div>
);
