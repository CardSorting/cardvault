import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BattleCard } from "@/lib/battle/types";

interface WarCardsProps {
  cards: BattleCard[];
  side: "player" | "opponent";
}

export const WarCards: React.FC<WarCardsProps> = ({ cards, side }) => (
  <div className="flex justify-center">
    <div className="grid grid-cols-3 gap-2">
      {cards.map((_, i) => (
        <Card
          key={i}
          className={cn(
            "w-20 h-28 glass-effect animate-warPulse card-shadow",
            side === "player" ? "border-purple-500/50" : "border-red-500/50",
          )}
        />
      ))}
    </div>
  </div>
);
