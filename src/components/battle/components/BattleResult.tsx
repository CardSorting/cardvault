import React from "react";
import { cn } from "@/lib/utils";
import { getResultStyles } from "@/lib/battle/utils";

interface BattleResultProps {
  result: string;
}

export const BattleResult: React.FC<BattleResultProps> = ({ result }) =>
  result ? (
    <div
      className={cn(
        "text-2xl font-bold px-6 py-3 rounded-lg animate-fadeIn backdrop-blur-sm",
        getResultStyles(result),
      )}
    >
      {result}
    </div>
  ) : null;
