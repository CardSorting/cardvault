import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ZoomIn, ZoomOut, Heart, Share2, Swords } from "lucide-react";

interface PriceHistoryPoint {
  date: string;
  price: number;
}

interface CardModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  card?: {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    rarity: "common" | "uncommon" | "rare" | "legendary";
    power: number;
    defense: number;
    available: boolean;
    priceHistory: PriceHistoryPoint[];
    owner: string;
    edition: string;
    totalMinted: number;
  };
}

const defaultCard = {
  id: "1",
  name: "Ancient Dragon",
  image:
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&h=1200&fit=crop",
  description:
    "A legendary dragon card from the ancient times. This card is part of the Mythical Beasts collection.",
  price: 299.99,
  rarity: "legendary",
  power: 8,
  defense: 5,
  available: true,
  priceHistory: [
    { date: "2024-01-01", price: 250 },
    { date: "2024-01-15", price: 275 },
    { date: "2024-02-01", price: 299.99 },
  ],
  owner: "CryptoCollector",
  edition: "1st Edition",
  totalMinted: 100,
} as const;

const rarityColors = {
  common: "bg-zinc-500",
  uncommon: "bg-blue-500",
  rare: "bg-purple-500",
  legendary: "bg-amber-500",
};

const CardModal = ({
  open = true,
  onOpenChange,
  card = defaultCard,
}: CardModalProps) => {
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [battleResult, setBattleResult] = React.useState<string | null>(null);

  const handleBattle = () => {
    // Simple battle logic: compare power + defense
    const opponentCard = {
      ...defaultCard,
      power: 6,
      defense: 4,
      name: "Opponent's Card",
    };

    const playerPower = card.power + card.defense;
    const opponentPower = opponentCard.power + opponentCard.defense;

    const result = playerPower > opponentPower ? "Victory!" : "Defeat";
    setBattleResult(result);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {card.name}
            <Badge
              className={`${rarityColors[card.rarity]} text-white capitalize`}
            >
              {card.rarity}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {card.edition} • #{card.id} of {card.totalMinted}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Left Column - Image and Zoom Controls */}
          <div className="space-y-4">
            <Card className="relative overflow-hidden bg-black aspect-[3/4] flex items-center justify-center">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover transition-transform"
                style={{ transform: `scale(${zoomLevel})` }}
              />
            </Card>
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.2))}
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))}
                disabled={zoomLevel >= 2}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - Details and Actions */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Price</h3>
              <p className="text-3xl font-bold text-green-400">
                ${card.price.toFixed(2)}
              </p>
            </div>

            <Separator className="bg-gray-700" />

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-400">{card.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Battle Stats</h3>
              <div className="flex gap-4">
                <Badge className="bg-red-600">Power: {card.power}</Badge>
                <Badge className="bg-blue-600">Defense: {card.defense}</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Owner</p>
                  <p>{card.owner}</p>
                </div>
                <div>
                  <p className="text-gray-400">Edition</p>
                  <p>{card.edition}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Minted</p>
                  <p>{card.totalMinted}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <Badge variant={card.available ? "default" : "destructive"}>
                    {card.available ? "Available" : "Sold Out"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={handleBattle}
                disabled={Boolean(battleResult)}
              >
                <Swords className="w-4 h-4 mr-2" />
                Battle
              </Button>
              <Button
                className="flex-1"
                disabled={!card.available || Boolean(battleResult)}
              >
                {card.available ? "Buy Now" : "Sold Out"}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {battleResult && (
              <div className="mt-4 p-4 rounded-lg bg-gray-800">
                <h3 className="text-xl font-bold mb-2">{battleResult}</h3>
                <p className="text-gray-400">
                  {battleResult === "Victory!"
                    ? "Your card overpowered the opponent!"
                    : "The opponent's card was stronger!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
