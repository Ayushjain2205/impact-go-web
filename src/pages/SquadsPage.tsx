import React, { useState } from "react";
import { Users, Plus, Search, ArrowLeft, Zap } from "lucide-react";
import { SquadDetailsBottomSheet } from "../components/SquadDetailsBottomSheet";
import { CreateNewSquadBottomSheet } from "../components/CreateNewSquadBottomSheet";
import { ImpactCoin } from "../components/ImpactCoin";

interface Squad {
  id: number;
  name: string;
  creator: string;
  members: number;
  isJoined: boolean;
  rewards: string;
  icon: string;
  category: string;
}

interface SquadDetails {
  id: number;
  name: string;
  category: string;
  description: string;
  sponsor: string;
  icon: string;
  members: number;
  issuesFixed: number;
  multiplier: string;
  specialReward: string;
  recentActivity: {
    text: string;
    time: string;
  }[];
}

export const SquadsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSquad, setSelectedSquad] = useState<SquadDetails | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isCreateSquadOpen, setIsCreateSquadOpen] = useState<boolean>(false);

  const categories = ["All", "General", "Environmental", "Safety"];

  const squads: Squad[] = [
    {
      id: 1,
      name: "Amazon Pathway Patrol",
      creator: "Amazon",
      members: 342,
      isJoined: true,
      rewards: "1.5x rewards",
      icon: "📦",
      category: "General",
    },
    {
      id: 2,
      name: "Tesla Clean Energy Squad",
      creator: "Tesla",
      members: 198,
      isJoined: false,
      rewards: "2x rewards",
      icon: "⚡",
      category: "Environmental",
    },
    {
      id: 3,
      name: "Uber Safety Rangers",
      creator: "Uber",
      members: 267,
      isJoined: false,
      rewards: "1.8x rewards",
      icon: "🚗",
      category: "Safety",
    },
    {
      id: 4,
      name: "Starbucks Community Clean",
      creator: "Starbucks",
      members: 445,
      isJoined: false,
      rewards: "1.3x rewards",
      icon: "☕",
      category: "Environmental",
    },
  ];

  const squadDetails: SquadDetails[] = [
    {
      id: 1,
      name: "Amazon Pathway Patrol",
      category: "Delivery Safety",
      description:
        "Amazon-sponsored squad focused on identifying broken sidewalks and footpaths for safer deliveries.",
      sponsor: "Amazon",
      icon: "📦",
      members: 342,
      issuesFixed: 156,
      multiplier: "1.5x",
      specialReward: "Amazon Gift Cards",
      recentActivity: [
        {
          text: "Cracked sidewalk on Market St reported",
          time: "1 hour ago",
        },
      ],
    },
    {
      id: 2,
      name: "Tesla Clean Energy Squad",
      category: "Environmental",
      description:
        "Tesla-sponsored squad focused on promoting clean energy initiatives and environmental sustainability.",
      sponsor: "Tesla",
      icon: "⚡",
      members: 198,
      issuesFixed: 89,
      multiplier: "2x",
      specialReward: "Tesla Store Credits",
      recentActivity: [
        {
          text: "Solar panel installation reported in Mission District",
          time: "3 hours ago",
        },
      ],
    },
    {
      id: 3,
      name: "Uber Safety Rangers",
      category: "Safety",
      description:
        "Uber-sponsored squad focused on improving road safety and transportation infrastructure.",
      sponsor: "Uber",
      icon: "🚗",
      members: 267,
      issuesFixed: 124,
      multiplier: "1.8x",
      specialReward: "Uber Credits",
      recentActivity: [
        {
          text: "Pothole on Mission St reported and fixed",
          time: "2 hours ago",
        },
      ],
    },
    {
      id: 4,
      name: "Starbucks Community Clean",
      category: "Environmental",
      description:
        "Starbucks-sponsored squad focused on community cleanup and waste reduction initiatives.",
      sponsor: "Starbucks",
      icon: "☕",
      members: 445,
      issuesFixed: 203,
      multiplier: "1.3x",
      specialReward: "Starbucks Gift Cards",
      recentActivity: [
        {
          text: "Litter cleanup completed in Castro District",
          time: "4 hours ago",
        },
      ],
    },
  ];

  const filteredSquads = squads.filter((squad) => {
    const matchesCategory =
      activeCategory === "All" || squad.category === activeCategory;
    const matchesSearch =
      squad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSquadClick = (squadId: number) => {
    const details = squadDetails.find((squad) => squad.id === squadId);
    if (details) {
      setSelectedSquad(details);
      setIsBottomSheetOpen(true);
    }
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedSquad(null);
  };

  const handleCreateSquad = (squadData: {
    name: string;
    description: string;
  }) => {
    console.log("Creating new squad:", squadData);
    // Add create squad logic here
    // For now, just close the bottom sheet
    setIsCreateSquadOpen(false);
  };

  const handleJoinSquad = (squadId: number) => {
    console.log(`Joining squad ${squadId}`);
    // Add join logic here
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const SquadCard: React.FC<{ squad: Squad }> = ({ squad }) => (
    <div
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => handleSquadClick(squad.id)}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
          {squad.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold font-display text-gray-800 text-base">
            {squad.name}
          </h3>
          <p className="text-sm text-gray-500 font-display">
            by {squad.creator}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span className="font-display">{squad.members} members</span>
        </div>
        <div className="flex items-center gap-1">
          <ImpactCoin size="sm" />
          <span className="text-green-600 text-xs font-semibold font-display">
            {squad.rewards}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToHome}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-black" />
          </button>
          <div className="flex-1 flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-impact-green)] rounded-full flex items-center justify-center">
              <Zap width={20} height={20} color="white" />
            </div>
            <h1 className="text-xl font-bold font-display text-black">
              Squads
            </h1>
          </div>
          <button
            onClick={() => setIsCreateSquadOpen(true)}
            className="w-8 h-8 text-white rounded-full flex items-center justify-center hover:bg-[var(--color-impact-green-dark)] transition-all duration-200"
          >
            <Plus size={20} color="black" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search squads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium font-display whitespace-nowrap transition-all duration-200 ${
                activeCategory === category
                  ? "bg-green-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Squad List */}
      <div className="px-4 pb-6">
        <div className="space-y-4">
          {filteredSquads.map((squad) => (
            <SquadCard key={squad.id} squad={squad} />
          ))}
        </div>
      </div>

      {/* Squad Details Bottom Sheet */}
      <SquadDetailsBottomSheet
        squad={selectedSquad}
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />

      {/* Create New Squad Bottom Sheet */}
      <CreateNewSquadBottomSheet
        isOpen={isCreateSquadOpen}
        onClose={() => setIsCreateSquadOpen(false)}
        onCreateSquad={handleCreateSquad}
      />
    </div>
  );
};
