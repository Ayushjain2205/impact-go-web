import React, { useState } from "react";
import { Trophy, Medal, Star, Users, ArrowLeft, Zap } from "lucide-react";
import { ImpactCoin } from "../components/ImpactCoin";

interface LeaderboardEntry {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  score: number;
}

interface SquadLeaderboardEntry {
  id: number;
  rank: number;
  name: string;
  icon: string;
  score: number;
  members: number;
}

export const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"individual" | "squads">(
    "individual"
  );

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const individualLeaderboard: LeaderboardEntry[] = [
    {
      id: 1,
      rank: 1,
      name: "EcoWarrior",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      score: 3420,
    },
    {
      id: 2,
      rank: 2,
      name: "CityGuardian",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      score: 3180,
    },
    {
      id: 3,
      rank: 3,
      name: "StreetHero",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      score: 2950,
    },
    {
      id: 4,
      rank: 4,
      name: "SafetyFirst",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      score: 2750,
    },
    {
      id: 5,
      rank: 5,
      name: "CleanStreets",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      score: 2580,
    },
    {
      id: 6,
      rank: 6,
      name: "RoadWarrior",
      avatar:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
      score: 2420,
    },
    {
      id: 7,
      rank: 7,
      name: "GreenGuardian",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      score: 2280,
    },
    {
      id: 8,
      rank: 8,
      name: "EcoChampion",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      score: 2150,
    },
    {
      id: 9,
      rank: 9,
      name: "CityCleaner",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      score: 2020,
    },
    {
      id: 10,
      rank: 10,
      name: "StreetSaver",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      score: 1890,
    },
  ];

  const squadLeaderboard: SquadLeaderboardEntry[] = [
    {
      id: 1,
      rank: 1,
      name: "Richmond Civic Alliance",
      icon: "🏛️",
      score: 24680,
      members: 203,
    },
    {
      id: 2,
      rank: 2,
      name: "SOMA Infrastructure",
      icon: "🏗️",
      score: 18750,
      members: 156,
    },
    {
      id: 3,
      rank: 3,
      name: "Green Bay Guardians",
      icon: "🌱",
      score: 15420,
      members: 127,
    },
    {
      id: 4,
      rank: 4,
      name: "Downtown Cleaners",
      icon: "🧹",
      score: 12300,
      members: 98,
    },
    {
      id: 5,
      rank: 5,
      name: "Safety First Squad",
      icon: "🛡️",
      score: 10890,
      members: 85,
    },
    {
      id: 6,
      rank: 6,
      name: "Street Warriors",
      icon: "⚔️",
      score: 9650,
      members: 72,
    },
    {
      id: 7,
      rank: 7,
      name: "Eco Defenders",
      icon: "🌿",
      score: 8420,
      members: 64,
    },
    {
      id: 8,
      rank: 8,
      name: "City Builders",
      icon: "🔨",
      score: 7890,
      members: 58,
    },
    {
      id: 9,
      rank: 9,
      name: "Green Team",
      icon: "🌳",
      score: 7150,
      members: 51,
    },
    {
      id: 10,
      rank: 10,
      name: "Community Heroes",
      icon: "🦸",
      score: 6820,
      members: 47,
    },
  ];

  const getRankDisplay = (rank: number) => {
    return (
      <span className="text-lg font-bold font-display text-gray-500">
        #{rank}
      </span>
    );
  };

  const IndividualEntry: React.FC<{ entry: LeaderboardEntry }> = ({
    entry,
  }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex-shrink-0 ">{getRankDisplay(entry.rank)}</div>

      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          src={entry.avatar}
          alt={entry.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold font-display text-black truncate">
          {entry.name}
        </h3>
      </div>

      <div className="flex items-center gap-1">
        <ImpactCoin size="sm" />
        <span className="text-green-600 font-bold font-display">
          {entry.score.toLocaleString()}
        </span>
      </div>
    </div>
  );

  const SquadEntry: React.FC<{ entry: SquadLeaderboardEntry }> = ({
    entry,
  }) => (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm">
      <div className="flex-shrink-0">{getRankDisplay(entry.rank)}</div>

      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
        {entry.icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold font-display text-black truncate">
          {entry.name}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <Users size={12} className="text-gray-400" />
          <span className="text-sm text-gray-500 font-display">
            {entry.members} members
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <ImpactCoin size="sm" />
        <span className="text-green-600 font-bold font-display">
          {entry.score.toLocaleString()}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white px-4 py-4">
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
              Leaderboard
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="flex gap-1 bg-white p-1 rounded-xl">
          <button
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-colors ${
              activeTab === "individual"
                ? "bg-green-500 text-white"
                : "text-gray-600 bg-white"
            }`}
            onClick={() => setActiveTab("individual")}
          >
            <span className="font-display">Top Hunters</span>
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-colors ${
              activeTab === "squads"
                ? "bg-green-500 text-white"
                : "text-gray-600 bg-white"
            }`}
            onClick={() => setActiveTab("squads")}
          >
            <span className="font-display">Top Squads</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {activeTab === "individual" ? (
          <div className="space-y-3">
            {individualLeaderboard.map((entry) => (
              <IndividualEntry key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {squadLeaderboard.map((entry) => (
              <SquadEntry key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
