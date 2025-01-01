import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { BattleCard as BattleCardType } from "@/lib/battle/types";
import { getCardStyles } from "@/lib/battle/utils";

interface BattleCardProps {
  card: BattleCardType;
  isAnimating: boolean;
  isWar: boolean;
  isWinner: boolean;
  side: "player" | "opponent";
}

export const BattleCard: React.FC<BattleCardProps> = ({
  card,
  isAnimating,
  isWar,
  isWinner,
  side,
}) => (
  <div className="flex flex-col items-center gap-4">
    <h2 className="text-xl font-bold flex items-center gap-2 text-glow">
      {side === "player" ? "Your Card" : "Opponent's Card"}
      {isWinner && <Crown className="text-yellow-400 animate-bounce" />}
    </h2>
    <Card
      className={cn(
        getCardStyles({ isAnimating, isWar, isWinner }),
        side === "player" ? "border-purple-500/30" : "border-red-500/30",
      )}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${side === "player" ? "from-purple-900/50" : "from-red-900/50"} to-transparent`}
        />
      </div>
      <h3 className="text-lg font-semibold my-2 text-glow">{card.name}</h3>
      <Badge
        className={`bg-gradient-to-r ${side === "player" ? "from-purple-600 to-pink-600" : "from-red-600 to-orange-600"} animate-pulse`}
      >
        <Swords className="w-4 h-4 mr-1" />
        Power: {card.power}
      </Badge>
    </Card>
  </div>
);
