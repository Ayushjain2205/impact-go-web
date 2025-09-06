import React, { useState } from "react";
import { Map } from "../components/Map";

export const HomePage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    { id: "All", icon: "⚡", label: "All" },
    { id: "Potholes", icon: "🚧", label: "Potholes" },
    { id: "Waste", icon: "🗑️", label: "Waste" },
    { id: "Lights", icon: "💡", label: "Lights" },
    { id: "Safety", icon: "⚠️", label: "Safety" },
  ];

  const issues = [
    { id: 1, type: "Waste", lat: 37.7849, lng: -122.4094, icon: "🗑️" },
    { id: 2, type: "Potholes", lat: 37.7649, lng: -122.4294, icon: "🚧" },
    { id: 3, type: "Lights", lat: 37.7549, lng: -122.4394, icon: "💡" },
    { id: 4, type: "Safety", lat: 37.7449, lng: -122.4494, icon: "⚠️" },
    { id: 5, type: "Waste", lat: 37.7349, lng: -122.4594, icon: "🚮" },
  ];

  return (
    <div className="h-screen w-full relative font-sans overflow-hidden">
      {/* Full Screen Map */}
      <div className="absolute inset-0 z-0">
        <Map issues={issues} />
      </div>

      {/* Top Navigation Bar - Floating Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-lg backdrop-blur-sm">
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
            <span className="text-lg font-bold text-gray-800">IMPACT GO</span>
          </div>

          <div className="flex items-center gap-1.5 bg-impact-green px-3 py-2 rounded-full text-white">
            <div className="text-base">🪙</div>
            <span className="text-sm font-semibold">1,247</span>
          </div>
        </div>
      </div>

      {/* Filter Bar - Floating Overlay */}
      <div className="absolute top-22 left-4 right-4 z-20">
        <div
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingRight: "16px",
            width: "100%",
          }}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-full font-medium text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                  isActive
                    ? "bg-impact-green text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-lg"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span className="text-base" style={{ fontSize: "16px" }}>
                  {filter.icon}
                </span>
                <span className="text-xs font-medium">{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Location Button - Floating Overlay */}
      <div className="absolute bottom-24 right-4 z-20">
        <button
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 hover:shadow-xl text-blue-500"
          onClick={() => {
            // Get the map instance from window
            const mapInstance = (window as any).leafletMap;

            if (mapInstance) {
              // Get user's current location and recenter
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    mapInstance.setView([latitude, longitude], 15);
                  },
                  (error) => {
                    console.error(
                      "Error getting location for recenter:",
                      error
                    );
                    // Fallback to default location
                    mapInstance.setView([37.7749, -122.4194], 15);
                  }
                );
              } else {
                // Fallback to default location
                mapInstance.setView([37.7749, -122.4194], 15);
              }
            } else {
              console.error("Map instance not found");
            }
          }}
          title="Center on my location"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>
      </div>

      {/* Report Issue Button - Floating Overlay */}
      <div className="absolute bottom-4 right-4 z-20">
        <button className="flex items-center gap-2 py-3 px-4 bg-impact-green text-white rounded-2xl text-sm font-semibold shadow-lg transition-all hover:bg-impact-green-dark hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0">
          <span className="text-lg">📷</span>
          <span className="text-sm font-semibold">Report Issue</span>
        </button>
      </div>
    </div>
  );
};
