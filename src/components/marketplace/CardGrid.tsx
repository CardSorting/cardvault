import React from "react";
import CardItem from "./CardItem";

interface Card {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  power: number;
  defense: number;
  available: boolean;
}

interface CardGridProps {
  cards?: Card[];
  isLoading?: boolean;
}

const defaultCards: Card[] = [
  {
    id: "1",
    name: "Ancient Dragon",
    image:
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&h=600&fit=crop",
    price: 299.99,
    rarity: "legendary",
    power: 8,
    defense: 5,
    available: true,
  },
  {
    id: "2",
    name: "Mystic Phoenix",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=600&fit=crop",
    price: 199.99,
    rarity: "rare",
    power: 6,
    defense: 4,
    available: true,
  },
  {
    id: "3",
    name: "Forest Sprite",
    image:
      "https://images.unsplash.com/photo-1502759683299-cdcd6974244f?w=400&h=600&fit=crop",
    price: 49.99,
    rarity: "uncommon",
    power: 4,
    defense: 3,
    available: false,
  },
  {
    id: "4",
    name: "Mountain Dwarf",
    image:
      "https://images.unsplash.com/photo-1440288736878-766bd5839edb?w=400&h=600&fit=crop",
    price: 29.99,
    rarity: "common",
    power: 2,
    defense: 1,
    available: true,
  },
];

const CardGrid = ({
  cards = defaultCards,
  isLoading = false,
}: CardGridProps) => {
  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-900 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="w-full h-[400px] bg-gray-800 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-900 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="flex justify-center">
            <CardItem
              id={card.id}
              name={card.name}
              image={card.image}
              price={card.price}
              rarity={card.rarity}
              available={card.available}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
