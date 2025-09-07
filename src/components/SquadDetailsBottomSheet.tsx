import React from "react";
import { X, Users, Target, Star, DollarSign } from "lucide-react";
import { ImpactCoin } from "./ImpactCoin";

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

interface SquadDetailsBottomSheetProps {
  squad: SquadDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SquadDetailsBottomSheet: React.FC<
  SquadDetailsBottomSheetProps
> = ({ squad, isOpen, onClose }) => {
  if (!isOpen || !squad) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#00000090]" onClick={onClose} />

      {/* Bottom Sheet */}
      <div className="relative w-full bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto scrollbar-hide">
        {/* Content */}
        <div className="px-6 pt-6 pb-6">
          {/* Squad Icon and Sponsor */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
              {squad.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold font-display text-black mb-1">
                {squad.name}
              </h2>
              <p className="text-sm text-gray-500 font-display">
                Sponsored by {squad.sponsor}
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="mb-4">
            <p className="text-green-600 font-semibold font-display text-lg">
              {squad.category}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-8 leading-relaxed text-base">
            {squad.description}
          </p>

          {/* Mission Focus */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8">
            <h3 className="font-bold font-display text-black mb-4 text-lg">
              Mission Focus
            </h3>
            <p className="text-gray-800 mb-4 font-display text-base">
              Footpath & Sidewalk Issues
            </p>
            <div className="flex items-center gap-3 mb-3">
              <ImpactCoin size="sm" />
              <span className="text-green-600 font-semibold font-display text-base">
                {squad.multiplier} Token Multiplier
              </span>
            </div>
            <p className="text-sm text-gray-600 font-display">
              Special Reward: {squad.specialReward}
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users size={20} className="text-white" />
              </div>
              <div className="text-3xl font-bold font-display text-black mb-1">
                {squad.members}
              </div>
              <div className="text-sm text-gray-500 font-display">Members</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target size={20} className="text-white" />
              </div>
              <div className="text-3xl font-bold font-display text-black mb-1">
                {squad.issuesFixed}
              </div>
              <div className="text-sm text-gray-500 font-display">
                Issues Fixed
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star size={20} className="text-white" />
              </div>
              <div className="text-3xl font-bold font-display text-black mb-1">
                {squad.multiplier}
              </div>
              <div className="text-sm text-gray-500 font-display">
                Multiplier
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-bold font-display text-black mb-4 text-lg">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {squad.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 font-display text-base">
                      {activity.text}
                    </p>
                    <p className="text-sm text-gray-500 font-display mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
