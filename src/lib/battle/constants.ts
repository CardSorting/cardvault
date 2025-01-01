import { BattleCard } from "./types";

export const defaultPlayerDeck: BattleCard[] = [
  {
    id: "1",
    name: "Ancient Dragon",
    image:
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&h=600&fit=crop",
    power: 8,
  },
  {
    id: "2",
    name: "Knight Commander",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=600&fit=crop",
    power: 5,
  },
  {
    id: "3",
    name: "Forest Guardian",
    image:
      "https://images.unsplash.com/photo-1553451133-8083c47243d6?w=400&h=600&fit=crop",
    power: 6,
  },
];

export const defaultOpponentDeck: BattleCard[] = [
  {
    id: "4",
    name: "Dark Knight",
    image:
      "https://images.unsplash.com/photo-1553451133-8083c47243d6?w=400&h=600&fit=crop",
    power: 7,
  },
  {
    id: "5",
    name: "Fire Mage",
    image:
      "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?w=400&h=600&fit=crop",
    power: 4,
  },
  {
    id: "6",
    name: "Ice Queen",
    image:
      "https://images.unsplash.com/photo-1553451133-8083c47243d6?w=400&h=600&fit=crop",
    power: 6,
  },
];

export const ANIMATION_DURATION = {
  CARD_DRAW: 500,
  WAR_RESOLUTION: 1000,
};
