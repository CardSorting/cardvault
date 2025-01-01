export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getResultStyles = (result: string) => {
  if (result.includes("You win")) {
    return "bg-green-900/50 text-green-400";
  }
  if (result.includes("Opponent wins")) {
    return "bg-red-900/50 text-red-400";
  }
  if (result.includes("War")) {
    return "bg-purple-900/50 text-purple-400";
  }
  return "bg-blue-900/50 text-blue-400";
};

export const getCardStyles = ({
  isAnimating,
  isWar,
  isWinner,
}: {
  isAnimating: boolean;
  isWar: boolean;
  isWinner: boolean;
}) => {
  return [
    "w-[280px] glass-effect p-4 relative transition-all duration-300 card-shadow card-hover-effect",
    isAnimating && "animate-cardDraw",
    isWar && "animate-warPulse",
    isWinner && "animate-victoryGlow",
  ]
    .filter(Boolean)
    .join(" ");
};
