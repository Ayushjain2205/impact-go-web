import React, { useState } from "react";
import {
  Users,
  Plus,
  Crown,
  Star,
  MapPin,
  Calendar,
  ArrowLeft,
} from "lucide-react";

interface Squad {
  id: number;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  leader: string;
  location: string;
  createdDate: string;
  isJoined: boolean;
  impactPoints: number;
  avatar: string;
}

export const SquadsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "my">("all");

  const squads: Squad[] = [
    {
      id: 1,
      name: "Eco Warriors",
      description: "Dedicated to cleaning up our city streets",
      members: 12,
      maxMembers: 20,
      leader: "Alice Johnson",
      location: "Downtown SF",
      createdDate: "2 weeks ago",
      isJoined: true,
      impactPoints: 2450,
      avatar: "🌱",
    },
    {
      id: 2,
      name: "Street Fixers",
      description: "Reporting and fixing infrastructure issues",
      members: 8,
      maxMembers: 15,
      leader: "Bob Smith",
      location: "Mission District",
      createdDate: "1 month ago",
      isJoined: false,
      impactPoints: 1890,
      avatar: "🔧",
    },
    {
      id: 3,
      name: "Safety Squad",
      description: "Making our neighborhoods safer for everyone",
      members: 15,
      maxMembers: 25,
      leader: "Carol Davis",
      location: "Castro District",
      createdDate: "3 weeks ago",
      isJoined: true,
      impactPoints: 3200,
      avatar: "🛡️",
    },
    {
      id: 4,
      name: "Green Guardians",
      description: "Environmental protection and sustainability",
      members: 6,
      maxMembers: 12,
      leader: "David Wilson",
      location: "Golden Gate Park",
      createdDate: "1 week ago",
      isJoined: false,
      impactPoints: 1560,
      avatar: "🌿",
    },
  ];

  const mySquads = squads.filter((squad) => squad.isJoined);
  const availableSquads = squads.filter((squad) => !squad.isJoined);

  const handleJoinSquad = (squadId: number) => {
    console.log(`Joining squad ${squadId}`);
    // Add join logic here
  };

  const handleLeaveSquad = (squadId: number) => {
    console.log(`Leaving squad ${squadId}`);
    // Add leave logic here
  };

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const SquadCard: React.FC<{ squad: Squad; showJoinButton?: boolean }> = ({
    squad,
    showJoinButton = false,
  }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
            {squad.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{squad.name}</h3>
            <p className="text-sm text-gray-600">{squad.description}</p>
          </div>
        </div>
        {squad.isJoined && (
          <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <Crown size={12} />
            <span>Member</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>
            {squad.members}/{squad.maxMembers}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{squad.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={14} />
          <span>{squad.impactPoints}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Led by {squad.leader} • {squad.createdDate}
        </div>
        {showJoinButton ? (
          <button
            onClick={() => handleJoinSquad(squad.id)}
            className="px-4 py-2 bg-[var(--color-impact-green)] text-white text-sm font-medium rounded-lg hover:bg-[var(--color-impact-green-dark)] transition-colors"
          >
            Join Squad
          </button>
        ) : (
          <button
            onClick={() => handleLeaveSquad(squad.id)}
            className="px-4 py-2 bg-red-100 text-red-600 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
          >
            Leave
          </button>
        )}
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
            <h1 className="text-2xl font-bold text-gray-800">Squads</h1>
            <p className="text-sm text-gray-600">
              Join forces to make an impact
            </p>
          </div>
          <button className="p-2 bg-[var(--color-impact-green)] text-white rounded-xl hover:bg-[var(--color-impact-green-dark)] transition-colors">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Squads ({availableSquads.length})
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "my"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("my")}
          >
            My Squads ({mySquads.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {activeTab === "all" ? (
          <div className="space-y-4">
            {availableSquads.length > 0 ? (
              availableSquads.map((squad) => (
                <SquadCard key={squad.id} squad={squad} showJoinButton={true} />
              ))
            ) : (
              <div className="text-center py-8">
                <Users size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No Available Squads
                </h3>
                <p className="text-sm text-gray-500">
                  Check back later for new squads to join!
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {mySquads.length > 0 ? (
              mySquads.map((squad) => (
                <SquadCard key={squad.id} squad={squad} />
              ))
            ) : (
              <div className="text-center py-8">
                <Users size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No Squads Joined
                </h3>
                <p className="text-sm text-gray-500">
                  Join a squad to start collaborating!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
