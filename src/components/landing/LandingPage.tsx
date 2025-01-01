import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords, Shield, Zap, Sparkles } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const featuredCards = [
    {
      name: "Ancient Dragon",
      image:
        "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&h=600&fit=crop",
      element: "fire",
      power: 8,
      defense: 5,
      rarity: "legendary",
    },
    {
      name: "Water Elemental",
      image:
        "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=600&fit=crop",
      element: "water",
      power: 6,
      defense: 4,
      rarity: "rare",
    },
    {
      name: "Earth Golem",
      image:
        "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?w=400&h=600&fit=crop",
      element: "earth",
      power: 4,
      defense: 7,
      rarity: "uncommon",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-gray-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <Badge className="mb-4 bg-purple-600 text-white hover:bg-purple-700">
              Battle Arena Now Live
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-red-400">
              Epic Card Battles Await
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build your deck, master the elements, and battle your way to glory
              in our strategic card battle arena
            </p>
            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 group"
                onClick={() => navigate("/battle")}
              >
                <Swords className="mr-2 h-5 w-5" />
                Enter Battle Arena
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-700 hover:bg-gray-800"
                onClick={() => navigate("/deck")}
              >
                Build Your Deck
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Featured Battle Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCards.map((card) => (
            <Card
              key={card.name}
              className="bg-gray-800 hover:bg-gray-750 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                  <h3 className="text-lg font-bold mb-2">{card.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-red-600">
                      <Swords className="w-3 h-3 mr-1" /> {card.power}
                    </Badge>
                    <Badge className="bg-blue-600">
                      <Shield className="w-3 h-3 mr-1" /> {card.defense}
                    </Badge>
                    <Badge className="bg-purple-600">
                      <Zap className="w-3 h-3 mr-1" /> {card.element}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Battle System Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-800/50">
        <h2 className="text-3xl font-bold mb-12 text-center">Battle System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors duration-300">
              <Swords className="h-8 w-8 text-red-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Strategic Combat</h3>
            <p className="text-gray-400">
              Master the elemental system and use card combinations to defeat
              your opponents
            </p>
          </div>
          <div className="text-center group">
            <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors duration-300">
              <Shield className="h-8 w-8 text-blue-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Deck Building</h3>
            <p className="text-gray-400">
              Build powerful decks with unique card combinations and strategies
            </p>
          </div>
          <div className="text-center group">
            <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors duration-300">
              <Sparkles className="h-8 w-8 text-yellow-400 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Earn Rewards</h3>
            <p className="text-gray-400">
              Win battles to earn experience points and unlock powerful new
              cards
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-gray-900/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the battle arena and prove your worth as a master card battler
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => navigate("/battle")}
          >
            Start Battling Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
