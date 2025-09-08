import React, { useState } from "react";
import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from "@web3auth/modal/react";
import { useSolanaWallet } from "@web3auth/modal/react/solana";
import { Map } from "../components/Map";
import { BottomSheet } from "../components/BottomSheet";
import { ReportBottomSheet } from "../components/ReportBottomSheet";
import { CategorySelectionBottomSheet } from "../components/CategorySelectionBottomSheet";
import { SuccessToast } from "../components/SuccessToast";
import { ImpactCoin } from "../components/ImpactCoin";
import { Zap, Menu, X, Users, Trophy, User, Loader2 } from "lucide-react";

interface Issue {
  id: number;
  type: string;
  lat: number;
  lng: number;
  icon: string;
  title: string;
  description: string;
  reportedBy: string;
  timeAgo: string;
  status: string;
  impact: number;
  image: string;
}

export const HomePage: React.FC = () => {
  const {
    connect,
    isConnected,
    connectorName,
    loading: connectLoading,
    error: connectError,
  } = useWeb3AuthConnect();
  const {
    disconnect,
    loading: disconnectLoading,
    error: disconnectError,
  } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { accounts } = useSolanaWallet();

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isReportBottomSheetOpen, setIsReportBottomSheetOpen] = useState(false);
  const [isCategorySelectionOpen, setIsCategorySelectionOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string>("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successReward, setSuccessReward] = useState(0);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: 1,
      type: "Waste",
      lat: 37.7849,
      lng: -122.4094,
      icon: "🗑️",
      title: "Garbage Pile",
      description: "Large pile of garbage on the street",
      reportedBy: "User123",
      timeAgo: "2h ago",
      status: "PENDING",
      impact: 75,
      image: "",
    },
    {
      id: 2,
      type: "Potholes",
      lat: 37.7649,
      lng: -122.4294,
      icon: "🚧",
      title: "Deep Pothole",
      description: "Dangerous pothole on main road",
      reportedBy: "User456",
      timeAgo: "1h ago",
      status: "IN_PROGRESS",
      impact: 50,
      image: "",
    },
    {
      id: 3,
      type: "Lights",
      lat: 37.7549,
      lng: -122.4394,
      icon: "💡",
      title: "Broken Street Light",
      description: "Street light not working at night",
      reportedBy: "User789",
      timeAgo: "3h ago",
      status: "PENDING",
      impact: 40,
      image: "",
    },
    {
      id: 4,
      type: "Safety",
      lat: 37.7449,
      lng: -122.4494,
      icon: "⚠️",
      title: "Safety Hazard",
      description: "Broken glass on sidewalk",
      reportedBy: "User101",
      timeAgo: "30m ago",
      status: "PENDING",
      impact: 60,
      image: "",
    },
    {
      id: 5,
      type: "Waste",
      lat: 37.7349,
      lng: -122.4594,
      icon: "🚮",
      title: "Overflowing Bin",
      description: "Trash bin overflowing",
      reportedBy: "User202",
      timeAgo: "45m ago",
      status: "RESOLVED",
      impact: 75,
      image: "",
    },
  ]);

  const filters = [
    { id: "All", icon: "⚡", label: "All" },
    { id: "Potholes", icon: "🚧", label: "Potholes" },
    { id: "Waste", icon: "🗑️", label: "Waste" },
    { id: "Lights", icon: "💡", label: "Lights" },
    { id: "Safety", icon: "⚠️", label: "Safety" },
  ];

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedIssue(null);
  };

  const handleHamburgerMenuToggle = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  const handleMenuClose = () => {
    setIsHamburgerMenuOpen(false);
  };

  const handleMenuAction = (action: string) => {
    console.log(`Menu action: ${action}`);
    setIsHamburgerMenuOpen(false);

    // Navigation logic based on the action
    switch (action) {
      case "squads":
        // Navigate to squads page
        window.location.href = "/squads";
        break;
      case "leaderboard":
        // Navigate to leaderboard page
        window.location.href = "/leaderboard";
        break;
      case "profile":
        // Navigate to profile page
        window.location.href = "/profile";
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
  };

  const handleOpenReportBottomSheet = () => {
    setIsReportBottomSheetOpen(true);
  };

  const handleCloseReportBottomSheet = () => {
    setIsReportBottomSheetOpen(false);
  };

  const handlePhotoTaken = (photoDataUrl: string) => {
    setCapturedPhoto(photoDataUrl);
    setIsReportBottomSheetOpen(false);
    setIsCategorySelectionOpen(true);
  };

  const handleRetakePhoto = () => {
    setIsCategorySelectionOpen(false);
    setIsReportBottomSheetOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    console.log("Category selected:", category);

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Create new issue
          const newIssue: Issue = {
            id: Date.now(), // Simple unique ID
            type: category,
            lat: latitude,
            lng: longitude,
            icon: getIconForType(category),
            title: getTitleForType(category),
            description: `New ${category.toLowerCase()} issue reported`,
            reportedBy: "You",
            timeAgo: "Just now",
            status: "PENDING",
            impact: getRewardForType(category),
            image: capturedPhoto,
          };

          // Add to issues array
          setIssues((prevIssues) => [newIssue, ...prevIssues]);

          // Close bottom sheets
          setIsCategorySelectionOpen(false);
          setCapturedPhoto("");

          // Show success toast
          setSuccessMessage(
            `Your ${category.toLowerCase()} issue has been reported!`
          );
          setSuccessReward(newIssue.impact);
          setShowSuccessToast(true);

          console.log("Issue reported successfully:", newIssue);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default location
          addIssueWithDefaultLocation(category);
        }
      );
    } else {
      // Fallback to default location
      addIssueWithDefaultLocation(category);
    }
  };

  const addIssueWithDefaultLocation = (category: string) => {
    const newIssue: Issue = {
      id: Date.now(),
      type: category,
      lat: 37.7749, // Default SF location
      lng: -122.4194,
      icon: getIconForType(category),
      title: getTitleForType(category),
      description: `New ${category.toLowerCase()} issue reported`,
      reportedBy: "You",
      timeAgo: "Just now",
      status: "PENDING",
      impact: getRewardForType(category),
      image: capturedPhoto,
    };

    setIssues((prevIssues) => [newIssue, ...prevIssues]);
    setIsCategorySelectionOpen(false);
    setCapturedPhoto("");

    // Show success toast
    setSuccessMessage(
      `Your ${category.toLowerCase()} issue has been reported!`
    );
    setSuccessReward(newIssue.impact);
    setShowSuccessToast(true);
  };

  const getIconForType = (type: string): string => {
    switch (type) {
      case "Potholes":
        return "🚧";
      case "Waste":
        return "🗑️";
      case "Lights":
        return "💡";
      case "Safety":
        return "⚠️";
      default:
        return "❓";
    }
  };

  const getTitleForType = (type: string): string => {
    switch (type) {
      case "Potholes":
        return "Pothole Report";
      case "Waste":
        return "Waste Issue";
      case "Lights":
        return "Street Light Problem";
      case "Safety":
        return "Safety Hazard";
      default:
        return "Issue Report";
    }
  };

  const getRewardForType = (type: string): number => {
    switch (type) {
      case "Potholes":
        return 50;
      case "Waste":
        return 75;
      case "Lights":
        return 40;
      case "Safety":
        return 60;
      default:
        return 50;
    }
  };

  // Filter issues based on active filter
  const filteredIssues =
    activeFilter === "All"
      ? issues
      : issues.filter((issue) => issue.type === activeFilter);

  // Loader component for loading state
  const loaderView = (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 relative">
      {/* Main gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #3DDC84 100%)",
        }}
      />
      <div className="text-center relative z-10 w-full max-w-xs">
        <div className="mb-6">
          <div className="w-16 h-16 bg-[var(--color-impact-green)] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Zap width={32} height={32} color="white" />
          </div>
        </div>
        <h1
          className="text-4xl font-display font-bold text-center mb-2 tracking-wider"
          style={{
            color: "#1D1033",
            fontWeight: "800",
            letterSpacing: "2px",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          IMPACT GO
        </h1>
        <p
          className="text-base font-sans text-center tracking-wide mb-8"
          style={{
            color: "#64748B",
            letterSpacing: "1px",
          }}
        >
          Hunt. Report. Impact.
        </p>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-[var(--color-impact-green)] animate-spin" />
          <p className="text-gray-600 text-sm">Connecting to wallet...</p>
        </div>
        {connectError && (
          <div className="text-red-500 text-sm mt-4">
            {connectError.message}
          </div>
        )}
      </div>
    </div>
  );

  // Unconnected view with Get Started button
  const unconnectedView = (
    <div className="min-h-screen flex flex-col items-center justify-center p-5 relative">
      {/* Main gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #3DDC84 100%)",
        }}
      />
      <div className="text-center relative z-10 w-full max-w-xs">
        <div className="mb-6">
          <div className="w-16 h-16 bg-[var(--color-impact-green)] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Zap width={32} height={32} color="white" />
          </div>
        </div>
        <h1
          className="text-4xl font-display font-bold text-center mb-2 tracking-wider"
          style={{
            color: "#1D1033",
            fontWeight: "800",
            letterSpacing: "2px",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          IMPACT GO
        </h1>
        <p
          className="text-base font-sans text-center tracking-wide mb-8"
          style={{
            color: "#64748B",
            letterSpacing: "1px",
          }}
        >
          Hunt. Report. Impact.
        </p>
        <button
          onClick={() => connect()}
          className="w-full py-4 px-6 bg-[var(--color-impact-green)] text-white rounded-xl text-base font-semibold hover:bg-[var(--color-impact-green-dark)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          {connectLoading ? "Connecting..." : "Get Started"}
        </button>
        {connectError && (
          <div className="text-red-500 text-sm mt-4">
            {connectError.message}
          </div>
        )}
      </div>
    </div>
  );

  // Show loader if connecting, unconnected view if not connected
  if (!isConnected) {
    if (connectLoading) {
      return loaderView;
    }
    return unconnectedView;
  }

  return (
    <div className="h-screen w-full relative font-sans overflow-hidden">
      {/* Full Screen Map */}
      <div className="absolute inset-0 z-0">
        <Map issues={filteredIssues} onIssueClick={handleIssueClick} />
      </div>

      {/* Top Navigation Bar - Floating Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-lg backdrop-blur-sm">
          <button
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={handleHamburgerMenuToggle}
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-impact-green)] rounded-full flex items-center justify-center">
              <Zap width={20} height={20} color="white" />
            </div>
            <span className="text-lg font-bold font-display text-gray-800">
              IMPACT GO
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-[var(--color-impact-green)] px-3 py-2 rounded-full text-white">
            <ImpactCoin size="sm" />
            <span className="text-sm font-semibold">1,247</span>
          </div>
        </div>
      </div>

      {/* Hamburger Menu */}
      {isHamburgerMenuOpen && (
        <div className="absolute inset-0 z-30">
          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-[#00000060]"
            onClick={handleMenuClose}
          />

          {/* Menu Panel */}
          <div className="absolute top-20 left-4 z-40">
            <div className="bg-white rounded-2xl shadow-xl w-48">
              <div className="p-2">
                <button
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => handleMenuAction("squads")}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <span className="text-gray-800 font-medium">Squads</span>
                </button>

                <button
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => handleMenuAction("leaderboard")}
                >
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Trophy size={16} className="text-yellow-600" />
                  </div>
                  <span className="text-gray-800 font-medium">Leaderboard</span>
                </button>

                <button
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => handleMenuAction("profile")}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <User size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-800 font-medium">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    ? "bg-[var(--color-impact-green)] text-white shadow-lg"
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

      {/* Current Location Button - Left Side */}
      <div
        className="absolute left-4 z-20"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 20px) + 20px)",
        }}
      >
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

      {/* Report Issue Button - Right Side */}
      <div
        className="absolute right-4 z-20"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 20px) + 20px)",
        }}
      >
        <button
          onClick={handleOpenReportBottomSheet}
          className="flex items-center gap-2 py-3 px-4 bg-[var(--color-impact-green)] text-white rounded-2xl text-sm font-semibold shadow-lg transition-all hover:bg-[var(--color-impact-green-dark)] hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
        >
          <span className="text-lg">📷</span>
          <span className="text-sm font-semibold">Report Issue</span>
        </button>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        issue={selectedIssue}
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />

      {/* Report Bottom Sheet */}
      <ReportBottomSheet
        isOpen={isReportBottomSheetOpen}
        onClose={handleCloseReportBottomSheet}
        onPhotoTaken={handlePhotoTaken}
      />

      {/* Category Selection Bottom Sheet */}
      <CategorySelectionBottomSheet
        isOpen={isCategorySelectionOpen}
        onClose={() => setIsCategorySelectionOpen(false)}
        photoDataUrl={capturedPhoto}
        onCategorySelect={handleCategorySelect}
        onRetakePhoto={handleRetakePhoto}
      />

      {/* Success Toast */}
      <SuccessToast
        isVisible={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        message={successMessage}
        reward={successReward}
      />
    </div>
  );
};
