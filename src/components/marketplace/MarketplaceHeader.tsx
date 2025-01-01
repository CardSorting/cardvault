import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

interface MarketplaceHeaderProps {
  onSearch?: (term: string) => void;
  onSort?: (option: string) => void;
  searchSuggestions?: string[];
}

const defaultProps: MarketplaceHeaderProps = {
  searchSuggestions: [
    "Ancient Dragon",
    "Mystic Phoenix",
    "Golden Unicorn",
    "Shadow Assassin",
    "Crystal Mage",
  ],
};

const MarketplaceHeader = (props: MarketplaceHeaderProps) => {
  const { searchSuggestions } = { ...defaultProps, ...props };
  const [searchOpen, setSearchOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full h-20 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        {/* Search Bar with Autocomplete */}
        <div className="relative w-full">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search cards..."
                  className="w-full pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search cards..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    {searchSuggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion}
                        onSelect={() => {
                          setSearchOpen(false);
                        }}
                      >
                        {suggestion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Sort Options */}
        <Select defaultValue="trending">
          <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Additional Header Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="default"
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => navigate("/create")}
        >
          Create Card
        </Button>
        <Button
          variant="outline"
          className="border-gray-700 text-white hover:bg-gray-800"
        >
          Advanced Filters
        </Button>
      </div>
    </header>
  );
};

export default MarketplaceHeader;
