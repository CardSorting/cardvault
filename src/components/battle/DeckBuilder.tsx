import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords, Shield, Zap } from "lucide-react";

interface CardData {
  id: string;
  name: string;
  image: string;
  power: number;
  defense: number;
  element: "fire" | "water" | "earth" | "air" | "light" | "dark";
  rarity: "common" | "uncommon" | "rare" | "legendary";
}

const availableCards: CardData[] = [
  {
    id: "1",
    name: "Ancient Dragon",
    image:
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&h=600&fit=crop",
    power: 8,
    defense: 5,
    element: "fire",
    rarity: "legendary",
  },
  {
    id: "2",
    name: "Water Elemental",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=600&fit=crop",
    power: 6,
    defense: 4,
    element: "water",
    rarity: "rare",
  },
  // Add more cards here
];

const DeckBuilder = () => {
  const [selectedCards, setSelectedCards] = React.useState<CardData[]>([]);

  const handleSelectCard = (card: CardData) => {
    if (selectedCards.length < 5) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const handleRemoveCard = (cardId: string) => {
    setSelectedCards(selectedCards.filter((card) => card.id !== cardId));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Deck Builder</h1>

        {/* Selected Deck */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Your Deck ({selectedCards.length}/5)
          </h2>
          <div className="grid grid-cols-5 gap-4">
            {selectedCards.map((card) => (
              <Card key={card.id} className="bg-gray-800 p-4 relative">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-sm font-semibold mb-2">{card.name}</h3>
                <div className="flex gap-1 mb-2">
                  <Badge className="bg-red-600">
                    <Swords className="w-3 h-3 mr-1" /> {card.power}
                  </Badge>
                  <Badge className="bg-blue-600">
                    <Shield className="w-3 h-3 mr-1" /> {card.defense}
                  </Badge>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={() => handleRemoveCard(card.id)}
                >
                  Remove
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Cards */}
        <h2 className="text-xl font-bold mb-4">Available Cards</h2>
        <div className="grid grid-cols-4 gap-4">
          {availableCards.map((card) => (
            <Card key={card.id} className="bg-gray-800 p-4 relative">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
              <div className="flex gap-2 mb-4">
                <Badge className="bg-red-600">
                  <Swords className="w-4 h-4 mr-1" /> {card.power}
                </Badge>
                <Badge className="bg-blue-600">
                  <Shield className="w-4 h-4 mr-1" /> {card.defense}
                </Badge>
                <Badge className="bg-purple-600">
                  <Zap className="w-4 h-4 mr-1" /> {card.element}
                </Badge>
              </div>
              <Button
                className="w-full"
                onClick={() => handleSelectCard(card)}
                disabled={
                  selectedCards.some((c) => c.id === card.id) ||
                  selectedCards.length >= 5
                }
              >
                Add to Deck
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckBuilder;
