import React from "react";

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

interface BottomSheetProps {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  issue,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !issue) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "RESOLVED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Waste":
        return "🗑️";
      case "Potholes":
        return "🚧";
      case "Lights":
        return "💡";
      case "Safety":
        return "⚠️";
      default:
        return "❓";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#00000090] z-30 transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-40 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Issue Image */}
          <div className="w-full h-28 bg-gray-200 rounded-xl mb-3 overflow-hidden">
            <img
              src={issue.image}
              alt={issue.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Issue Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getTypeIcon(issue.type)}</span>
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                {issue.type === "Safety" ? "HAZARD" : issue.type.toUpperCase()}
              </span>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                issue.status
              )}`}
            >
              {issue.status}
            </span>
          </div>

          {/* Issue Title and Description */}
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            {issue.title}
          </h2>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {issue.description}
          </p>

          {/* Issue Meta */}
          <div className="text-xs text-gray-500 mb-4">
            <p>
              Reported by {issue.reportedBy} • {issue.timeAgo}
            </p>
          </div>

          {/* Impact Button */}
          <button className="w-full bg-[var(--color-impact-green)] text-white py-3 px-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-[var(--color-impact-green-dark)] transition-colors">
            <span className="text-lg">🪙</span>
            <span>{issue.impact} $IMPACT</span>
          </button>
        </div>
      </div>
    </>
  );
};
