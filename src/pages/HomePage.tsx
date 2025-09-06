import React, { useState } from "react";

export const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    { id: "All", icon: "⚡", label: "All" },
    { id: "Potholes", icon: "🚧", label: "Potholes" },
    { id: "Waste", icon: "🗑️", label: "Waste" },
    { id: "Lights", icon: "💡", label: "Lights" },
  ];

  const issues = [
    { id: 1, type: "Waste", x: 75, y: 25, icon: "🗑️" },
    { id: 2, type: "Potholes", x: 45, y: 50, icon: "🚧" },
    { id: 3, type: "Lights", x: 25, y: 75, icon: "💡" },
    { id: 4, type: "Warning", x: 15, y: 85, icon: "⚠️" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative font-sans">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 py-4 bg-white shadow-sm relative z-10 md:px-6 md:py-5">
        <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex flex-col gap-1">
            <span className="w-4 h-0.5 bg-gray-600 rounded-sm"></span>
            <span className="w-4 h-0.5 bg-gray-600 rounded-sm"></span>
            <span className="w-4 h-0.5 bg-gray-600 rounded-sm"></span>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-impact-green rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-gray-800 md:text-xl">
            IMPACT GO
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-impact-green px-3 py-2 rounded-full text-white md:px-4">
          <div className="text-base">🪙</div>
          <span className="text-sm font-semibold md:text-base">1,247</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 px-4 py-4 bg-white border-b border-gray-200 overflow-x-auto md:gap-3 md:px-6 md:py-5">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap min-w-fit md:px-5 md:text-base ${
              activeFilter === filter.id
                ? "bg-impact-green-light border border-impact-green text-impact-green"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            <span className="text-base md:text-lg">{filter.icon}</span>
            <span className="text-xs md:text-sm">{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Map Area */}
      <div
        className="flex-1 relative bg-gray-50 overflow-hidden"
        style={{
          backgroundImage: `
               linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
             `,
          backgroundSize: "20px 20px",
        }}
      >
        <div className="relative w-full h-full">
          {/* Issue Markers */}
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-transform hover:scale-110 md:w-9 md:h-9 ${
                issue.type === "Waste"
                  ? "bg-impact-green"
                  : issue.type === "Potholes"
                  ? "bg-orange-500"
                  : issue.type === "Lights"
                  ? "bg-blue-500"
                  : "bg-red-500"
              }`}
              style={{ left: `${issue.x}%`, top: `${issue.y}%` }}
            >
              <span className="text-lg drop-shadow-sm md:text-xl">
                {issue.icon}
              </span>
            </div>
          ))}

          {/* Grid Zones */}
          <div
            className="absolute w-15 h-10 bg-impact-green-light rounded-lg border border-green-200"
            style={{ left: "15%", top: "15%" }}
          ></div>
          <div
            className="absolute w-15 h-10 bg-impact-green-light rounded-lg border border-green-200"
            style={{ left: "65%", top: "35%" }}
          ></div>
          <div
            className="absolute w-15 h-10 bg-impact-green-light rounded-lg border border-green-200"
            style={{ left: "75%", top: "75%" }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-24 right-4 z-5 md:bottom-28 md:right-6">
        <button className="w-12 h-12 bg-white border-none rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all hover:scale-105 hover:shadow-xl text-blue-500 md:w-13 md:h-13">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Report Issue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10 md:p-5">
        <button className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-impact-green text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all hover:bg-impact-green-dark hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 md:py-4.5 md:px-7 md:text-lg">
          <span className="text-xl md:text-2xl">📷</span>
          <span className="text-base font-semibold md:text-lg">
            Report Issue
          </span>
        </button>
      </div>
    </div>
  );
};
