import React from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  categories?: string[];
  rarities?: string[];
  priceRange?: [number, number];
  selectedCategories?: string[];
  selectedRarities?: string[];
  selectedPriceRange?: [number, number];
}

interface FilterState {
  categories: string[];
  rarities: string[];
  priceRange: [number, number];
}

const defaultProps: FilterSidebarProps = {
  categories: ["Creatures", "Spells", "Artifacts", "Lands", "Planeswalkers"],
  rarities: ["common", "uncommon", "rare", "legendary"],
  priceRange: [0, 1000],
  selectedCategories: [],
  selectedRarities: [],
  selectedPriceRange: [0, 1000],
};

const FilterSidebar = (props: FilterSidebarProps) => {
  const {
    categories,
    rarities,
    priceRange,
    selectedCategories,
    selectedRarities,
    selectedPriceRange,
    onFilterChange,
  } = { ...defaultProps, ...props };

  const [currentPriceRange, setCurrentPriceRange] = React.useState<
    [number, number]
  >(selectedPriceRange || [0, 1000]);

  return (
    <aside className="w-[280px] h-full bg-gray-900 p-6 border-r border-gray-800 overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-6">Filters</h2>

      <Accordion type="single" collapsible className="w-full">
        {/* Categories Section */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-white">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories?.includes(category)}
                    onCheckedChange={() => {
                      // Implement checkbox change handler
                    }}
                  />
                  <Label
                    htmlFor={category}
                    className="text-sm font-medium leading-none text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rarity Section */}
        <AccordionItem value="rarity">
          <AccordionTrigger className="text-white">Rarity</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {rarities.map((rarity) => (
                <div key={rarity} className="flex items-center space-x-2">
                  <Checkbox
                    id={rarity}
                    checked={selectedRarities?.includes(rarity)}
                    onCheckedChange={() => {
                      // Implement checkbox change handler
                    }}
                  />
                  <Label
                    htmlFor={rarity}
                    className="text-sm font-medium leading-none text-gray-300 capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {rarity}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Section */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-white">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Slider
                defaultValue={currentPriceRange}
                max={priceRange[1]}
                min={priceRange[0]}
                step={1}
                onValueChange={(value: number[]) => {
                  setCurrentPriceRange([value[0], value[1]]);
                }}
                className="mt-6"
              />
              <div className="flex justify-between text-sm text-gray-300">
                <span>${currentPriceRange[0]}</span>
                <span>${currentPriceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default FilterSidebar;
