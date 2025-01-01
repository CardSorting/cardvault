import React from "react";
import { useBattleState } from "@/lib/battle/hooks/useBattleState";
import { BattleCard } from "./components/BattleCard";
import { BattleControls } from "./components/BattleControls";
import { BattleResult } from "./components/BattleResult";
import { BattleScore } from "./components/BattleScore";
import { WarCards } from "./components/WarCards";

const BattleArena = () => {
  const [state, actions] = useBattleState();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-gray-900 text-white p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?auto=format&fit=crop')] bg-cover bg-center opacity-5" />

      <div className="max-w-4xl mx-auto space-y-8 relative">
        <BattleScore
          playerScore={state.playerScore}
          opponentScore={state.opponentScore}
          playerDeckCount={state.playerDeck.length}
          opponentDeckCount={state.opponentDeck.length}
          wonCardsCount={state.wonCards.length}
        />

        {state.isWar && state.warCards.length > 0 && (
          <div className="grid grid-cols-2 gap-8 mb-8">
            <WarCards cards={state.warCards.slice(0, 3)} side="player" />
            <WarCards cards={state.warCards.slice(3)} side="opponent" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          {state.playerCard && (
            <BattleCard
              card={state.playerCard}
              isAnimating={state.isAnimating}
              isWar={state.isWar}
              isWinner={state.result.includes("You win")}
              side="player"
            />
          )}

          {state.opponentCard && (
            <BattleCard
              card={state.opponentCard}
              isAnimating={state.isAnimating}
              isWar={state.isWar}
              isWinner={state.result.includes("Opponent wins")}
              side="opponent"
            />
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <BattleResult result={state.result} />
          <BattleControls
            actions={actions}
            isWar={state.isWar}
            isAnimating={state.isAnimating}
            gameOver={state.gameOver}
          />
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
