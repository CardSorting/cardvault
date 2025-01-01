export interface BattleCard {
  id: string;
  name: string;
  image: string;
  power: number;
}

export interface BattleState {
  playerDeck: BattleCard[];
  opponentDeck: BattleCard[];
  playerCard: BattleCard | null;
  opponentCard: BattleCard | null;
  warCards: BattleCard[];
  isWar: boolean;
  result: string;
  playerScore: number;
  opponentScore: number;
  isAnimating: boolean;
  wonCards: BattleCard[];
  gameOver: boolean;
}

export interface BattleActions {
  drawCards: () => void;
  resolveWar: () => void;
  shuffleDeck: () => void;
  resetGame: () => void;
}
