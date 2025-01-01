import { addExperience, awardAchievement, BATTLE_REWARDS } from "./points";

export interface Card {
  id: string;
  name: string;
  image: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  power: number;
  defense: number;
  element: "fire" | "water" | "earth" | "air" | "light" | "dark";
  abilities: string[];
}

export interface BattleResult {
  winner: string;
  experienceGained: number;
  battlePointsGained: number;
  achievements?: string[];
  cardRewards?: Card[];
}

// Element effectiveness multipliers
const ELEMENT_MATCHUPS = {
  fire: { water: 0.5, air: 1.5 },
  water: { fire: 1.5, earth: 0.5 },
  earth: { air: 0.5, water: 1.5 },
  air: { earth: 1.5, fire: 0.5 },
  light: { dark: 1.5 },
  dark: { light: 1.5 },
};

// Calculate battle outcome between two cards
export const calculateBattle = (card1: Card, card2: Card): number => {
  let power1 = card1.power;
  let power2 = card2.power;

  // Apply element effectiveness
  const matchups1 = ELEMENT_MATCHUPS[card1.element];
  const matchups2 = ELEMENT_MATCHUPS[card2.element];

  if (matchups1 && matchups1[card2.element]) {
    power1 *= matchups1[card2.element];
  }
  if (matchups2 && matchups2[card1.element]) {
    power2 *= matchups2[card1.element];
  }

  // Calculate final battle power including defense
  const finalPower1 = power1 * (1 + card1.defense / 100);
  const finalPower2 = power2 * (1 + card2.defense / 100);

  return finalPower1 - finalPower2;
};

// Process battle result and award rewards
export const processBattleResult = (
  result: number,
  isPlayerWinner: boolean,
): BattleResult => {
  const battleResult: BattleResult = {
    winner: isPlayerWinner ? "player" : "opponent",
    experienceGained: 0,
    battlePointsGained: 0,
    achievements: [],
  };

  if (isPlayerWinner) {
    // Award experience and battle points for winning
    const isPerfectWin = result > 50;
    battleResult.experienceGained = isPerfectWin ? 150 : 100;
    battleResult.battlePointsGained = isPerfectWin
      ? BATTLE_REWARDS.PERFECT_WIN
      : BATTLE_REWARDS.WIN;

    const { newLevel } = addExperience(battleResult.experienceGained);
    if (newLevel) {
      battleResult.achievements?.push("level_up");
    }

    // Check for battle-related achievements
    const { isNew } = awardAchievement("first_battle");
    if (isNew) {
      battleResult.achievements?.push("first_battle");
    }
  } else {
    // Award consolation experience and battle points
    battleResult.experienceGained = 50;
    battleResult.battlePointsGained = BATTLE_REWARDS.LOSS;
    addExperience(battleResult.experienceGained);
  }

  return battleResult;
};
