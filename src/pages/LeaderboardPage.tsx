import React, { useState } from "react";
import {
  Trophy,
  Medal,
  Star,
  Users,
  Calendar,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

interface LeaderboardEntry {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  reports: number;
  joinDate: string;
  isCurrentUser?: boolean;
  badge?: string;
}

interface SquadLeaderboardEntry {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  points: number;
  members: number;
  reports: number;
  isJoined?: boolean;
}

export const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"individual" | "squads">(
    "individual"
  );
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "week">("all");

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const individualLeaderboard: LeaderboardEntry[] = [
    {
      id: 1,
      rank: 1,
      name: "Alice Johnson",
      avatar: "👩‍💼",
      points: 3240,
      reports: 28,
      joinDate: "3 months ago",
      badge: "Eco Champion",
    },
    {
      id: 2,
      rank: 2,
      name: "Bob Smith",
      avatar: "👨‍🔧",
      points: 2890,
      reports: 24,
      joinDate: "2 months ago",
      badge: "Street Hero",
    },
    {
      id: 3,
      rank: 3,
      name: "Carol Davis",
      avatar: "👩‍🚀",
      points: 2650,
      reports: 22,
      joinDate: "4 months ago",
      badge: "Safety Star",
    },
    {
      id: 4,
      rank: 4,
      name: "David Wilson",
      avatar: "👨‍🌾",
      points: 2340,
      reports: 19,
      joinDate: "1 month ago",
    },
    {
      id: 5,
      rank: 5,
      name: "You",
      avatar: "👤",
      points: 1890,
      reports: 15,
      joinDate: "2 weeks ago",
      isCurrentUser: true,
    },
    {
      id: 6,
      rank: 6,
      name: "Emma Brown",
      avatar: "👩‍🎨",
      points: 1760,
      reports: 14,
      joinDate: "3 weeks ago",
    },
    {
      id: 7,
      rank: 7,
      name: "Frank Miller",
      avatar: "👨‍💻",
      points: 1620,
      reports: 13,
      joinDate: "1 week ago",
    },
  ];

  const squadLeaderboard: SquadLeaderboardEntry[] = [
    {
      id: 1,
      rank: 1,
      name: "Eco Warriors",
      avatar: "🌱",
      points: 12450,
      members: 12,
      reports: 89,
      isJoined: true,
    },
    {
      id: 2,
      rank: 2,
      name: "Safety Squad",
      avatar: "🛡️",
      points: 11200,
      members: 15,
      reports: 76,
      isJoined: true,
    },
    {
      id: 3,
      rank: 3,
      name: "Street Fixers",
      avatar: "🔧",
      points: 9450,
      members: 8,
      reports: 63,
      isJoined: false,
    },
    {
      id: 4,
      rank: 4,
      name: "Green Guardians",
      avatar: "🌿",
      points: 7800,
      members: 6,
      reports: 52,
      isJoined: false,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy size={20} className="text-yellow-500" />;
      case 2:
        return <Medal size={20} className="text-gray-400" />;
      case 3:
        return <Medal size={20} className="text-amber-600" />;
      default:
        return (
          <span className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
            {rank}
          </span>
        );
    }
  };

  const IndividualEntry: React.FC<{ entry: LeaderboardEntry }> = ({
    entry,
  }) => (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
        entry.isCurrentUser
          ? "bg-[var(--color-impact-green)] bg-opacity-10 border border-[var(--color-impact-green)] border-opacity-30"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex-shrink-0">{getRankIcon(entry.rank)}</div>

      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
        {entry.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className={`font-semibold truncate ${
              entry.isCurrentUser
                ? "text-[var(--color-impact-green)]"
                : "text-gray-800"
            }`}
          >
            {entry.name}
          </h3>
          {entry.badge && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              {entry.badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
          <span>{entry.points.toLocaleString()} pts</span>
          <span>{entry.reports} reports</span>
          <span>{entry.joinDate}</span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-2xl font-bold text-gray-800">
          {entry.points.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">points</div>
      </div>
    </div>
  );

  const SquadEntry: React.FC<{ entry: SquadLeaderboardEntry }> = ({
    entry,
  }) => (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl transition-colors ${
        entry.isJoined
          ? "bg-[var(--color-impact-green)] bg-opacity-10 border border-[var(--color-impact-green)] border-opacity-30"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex-shrink-0">{getRankIcon(entry.rank)}</div>

      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
        {entry.avatar}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className={`font-semibold truncate ${
              entry.isJoined
                ? "text-[var(--color-impact-green)]"
                : "text-gray-800"
            }`}
          >
            {entry.name}
          </h3>
          {entry.isJoined && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Joined
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
          <span>{entry.members} members</span>
          <span>{entry.reports} reports</span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-2xl font-bold text-gray-800">
          {entry.points.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">points</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackToHome}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">Leaderboard</h1>
            <p className="text-sm text-gray-600">
              Top performers making an impact
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp
              size={20}
              className="text-[var(--color-impact-green)]"
            />
          </div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="px-4 py-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              timeFilter === "all"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setTimeFilter("all")}
          >
            All Time
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              timeFilter === "month"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setTimeFilter("month")}
          >
            This Month
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              timeFilter === "week"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setTimeFilter("week")}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "individual"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("individual")}
          >
            <div className="flex items-center justify-center gap-2">
              <Users size={16} />
              <span>Individuals</span>
            </div>
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "squads"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("squads")}
          >
            <div className="flex items-center justify-center gap-2">
              <Trophy size={16} />
              <span>Squads</span>
            </div>
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
