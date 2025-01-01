import { useState } from "react";
import { BattleCard, BattleState, BattleActions } from "../types";
import { shuffleArray } from "../utils";
import { defaultPlayerDeck, defaultOpponentDeck } from "../constants";

export const useBattleState = (): [BattleState, BattleActions] => {
  const [state, setState] = useState<BattleState>({
    playerDeck: defaultPlayerDeck,
    opponentDeck: defaultOpponentDeck,
    playerCard: null,
    opponentCard: null,
    warCards: [],
    isWar: false,
    result: "",
    playerScore: 0,
    opponentScore: 0,
    isAnimating: false,
    wonCards: [],
    gameOver: false,
  });

  const drawCards = () => {
    if (state.playerDeck.length === 0 || state.opponentDeck.length === 0) {
      setState((prev) => ({
        ...prev,
        gameOver: true,
        result: `Game Over! ${prev.playerScore > prev.opponentScore ? "You Win!" : "Opponent Wins!"}`,
      }));
      return;
    }

    setState((prev) => {
      const newPlayerCard = prev.playerDeck[0];
      const newOpponentCard = prev.opponentDeck[0];
      const newPlayerDeck = prev.playerDeck.slice(1);
      const newOpponentDeck = prev.opponentDeck.slice(1);

      let result = "";
      let isWar = false;
      let playerScore = prev.playerScore;
      let opponentScore = prev.opponentScore;
      let wonCards = [...prev.wonCards];

      if (newPlayerCard.power === newOpponentCard.power) {
        result = "War!";
        isWar = true;
      } else if (newPlayerCard.power > newOpponentCard.power) {
        result = "You win this round!";
        playerScore++;
        wonCards.push(newPlayerCard, newOpponentCard);
      } else {
        result = "Opponent wins this round!";
        opponentScore++;
      }

      return {
        ...prev,
        playerDeck: newPlayerDeck,
        opponentDeck: newOpponentDeck,
        playerCard: newPlayerCard,
        opponentCard: newOpponentCard,
        isWar,
        result,
        playerScore,
        opponentScore,
        isAnimating: true,
        wonCards,
      };
    });

    setTimeout(() => {
      setState((prev) => ({ ...prev, isAnimating: false }));
    }, 500);
  };

  const resolveWar = () => {
    if (state.playerDeck.length < 4 || state.opponentDeck.length < 4) {
      const winner =
        state.playerDeck.length > state.opponentDeck.length
          ? "You win"
          : "Opponent wins";
      setState((prev) => ({
        ...prev,
        result: `Not enough cards for war! ${winner} by default!`,
        gameOver: true,
      }));
      return;
    }

    setState((prev) => {
      const playerWarCards = prev.playerDeck.slice(0, 3);
      const opponentWarCards = prev.opponentDeck.slice(0, 3);
      const playerWarCard = prev.playerDeck[3];
      const opponentWarCard = prev.opponentDeck[3];

      return {
        ...prev,
        warCards: [...playerWarCards, ...opponentWarCards],
        playerCard: playerWarCard,
        opponentCard: opponentWarCard,
        playerDeck: prev.playerDeck.slice(4),
        opponentDeck: prev.opponentDeck.slice(4),
        isAnimating: true,
      };
    });

    setTimeout(() => {
      setState((prev) => {
        if (!prev.playerCard || !prev.opponentCard) return prev;

        let result = "";
        let playerScore = prev.playerScore;
        let opponentScore = prev.opponentScore;
        let wonCards = [...prev.wonCards];
        let isWar = false;

        if (prev.playerCard.power > prev.opponentCard.power) {
          result = "You win the war!";
          playerScore += 2;
          wonCards = [
            ...wonCards,
            ...prev.warCards,
            prev.playerCard,
            prev.opponentCard,
          ];
        } else if (prev.playerCard.power < prev.opponentCard.power) {
          result = "Opponent wins the war!";
          opponentScore += 2;
        } else {
          result = "Another tie! Double war!";
          isWar = true;
        }

        return {
          ...prev,
          result,
          playerScore,
          opponentScore,
          isAnimating: false,
          wonCards,
          isWar,
        };
      });
    }, 1000);
  };

  const shuffleDeck = () => {
    setState((prev) => ({
      ...prev,
      playerDeck: shuffleArray([...prev.playerDeck]),
      opponentDeck: shuffleArray([...prev.opponentDeck]),
      result: "Decks shuffled!",
    }));
  };

  const resetGame = () => {
    setState({
      playerDeck: shuffleArray([...defaultPlayerDeck]),
      opponentDeck: shuffleArray([...defaultOpponentDeck]),
      playerCard: null,
      opponentCard: null,
      warCards: [],
      isWar: false,
      result: "",
      playerScore: 0,
      opponentScore: 0,
      isAnimating: false,
      wonCards: [],
      gameOver: false,
    });
  };

  return [state, { drawCards, resolveWar, shuffleDeck, resetGame }];
};
