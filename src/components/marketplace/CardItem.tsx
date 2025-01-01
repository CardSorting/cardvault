import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CardItemProps {
  id?: string;
  name?: string;
  image?: string;
  price?: number;
  rarity?: "common" | "uncommon" | "rare" | "legendary";
  power?: number;
  defense?: number;
  available?: boolean;
}

const rarityColors = {
  common: "bg-zinc-500",
  uncommon: "bg-blue-500",
  rare: "bg-purple-500",
  legendary: "bg-amber-500",
};

const defaultProps: CardItemProps = {
  id: "1",
  name: "Ancient Dragon",
  image:
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&h=600&fit=crop",
  price: 299.99,
  power: 8,
  defense: 5,
  rarity: "legendary",
  available: true,
};

const CardItem = (props: CardItemProps) => {
  const { name, image, price, rarity, available } = {
    ...defaultProps,
    ...props,
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Card className="w-[280px] h-[400px] bg-gray-900 relative group transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="relative w-full h-full overflow-hidden">
              {/* Card Image */}
              <div className="w-full h-[300px] overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Rarity Badge */}
              <Badge
                className={`absolute top-2 right-2 ${rarityColors[rarity]} text-white capitalize`}
              >
                {rarity}
              </Badge>

              {/* Card Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-green-400">
                    ${price.toFixed(2)}
                  </span>
                  <Badge variant={available ? "default" : "destructive"}>
                    {available ? "Available" : "Sold Out"}
                  </Badge>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-red-600">
                      PWR {props.power || defaultProps.power}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-600">
                      DEF {props.defense || defaultProps.defense}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div
                  className={`absolute inset-0 ${rarityColors[rarity]} opacity-20 blur-xl`}
                />
              </div>
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to view details</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CardItem;
