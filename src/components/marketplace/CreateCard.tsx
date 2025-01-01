import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface CreateCardProps {
  onSubmit?: (cardData: CardFormData) => void;
}

interface CardFormData {
  name: string;
  description: string;
  image: string;
  rarity: "common" | "uncommon" | "rare" | "legendary";
  price: number;
  category: string;
}

const CreateCard = ({ onSubmit }: CreateCardProps) => {
  const [previewImage, setPreviewImage] = React.useState(
    "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&h=600&fit=crop",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for form submission
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Trading Card</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Preview Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Card Preview</h2>
            <Card className="w-[280px] h-[400px] bg-gray-800 relative overflow-hidden">
              <img
                src={previewImage}
                alt="Card Preview"
                className="w-full h-[300px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">Card Title</h3>
                <p className="text-sm text-gray-400">Preview your card here</p>
              </div>
            </Card>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Card Name</Label>
              <Input
                id="name"
                placeholder="Enter card name"
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter card description"
                className="bg-gray-800 border-gray-700 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                placeholder="Enter image URL"
                className="bg-gray-800 border-gray-700"
                onChange={(e) => setPreviewImage(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rarity">Rarity</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="uncommon">Uncommon</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="creatures">Creatures</SelectItem>
                  <SelectItem value="spells">Spells</SelectItem>
                  <SelectItem value="artifacts">Artifacts</SelectItem>
                  <SelectItem value="lands">Lands</SelectItem>
                  <SelectItem value="planeswalkers">Planeswalkers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Create Card
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;
