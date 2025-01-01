import React from "react";
import MarketplaceHeader from "./marketplace/MarketplaceHeader";
import FilterSidebar from "./marketplace/FilterSidebar";
import CardGrid from "./marketplace/CardGrid";
import CardModal from "./marketplace/CardModal";

interface HomeProps {
  initialSelectedCard?: string;
}

const Home = ({ initialSelectedCard }: HomeProps = {}) => {
  const [selectedCardId, setSelectedCardId] = React.useState<string | null>(
    initialSelectedCard || null,
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Marketplace Header */}
      <MarketplaceHeader />

      {/* Main Content Area */}
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar />

        {/* Card Grid */}
        <div className="flex-1">
          <CardGrid />
        </div>
      </div>

      {/* Card Modal */}
      <CardModal
        open={Boolean(selectedCardId)}
        onOpenChange={(open) => {
          if (!open) setSelectedCardId(null);
        }}
      />
    </div>
  );
};

export default Home;
