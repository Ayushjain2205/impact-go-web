import React, { useEffect, useState } from "react";
import { ImpactCoin } from "./ImpactCoin";

interface SuccessToastProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  reward: number;
}

export const SuccessToast: React.FC<SuccessToastProps> = ({
  isVisible,
  onClose,
  message,
  reward,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="confetti-piece"
                style={{
                  backgroundColor: [
                    "#3ddc84", // Green
                    "#ff6b6b", // Red
                    "#4ecdc4", // Teal
                    "#ffc300", // Yellow
                    "#2979ff", // Blue
                    "#ff9ff3", // Pink
                    "#ff6b35", // Orange
                    "#a8e6cf", // Light Green
                  ][Math.floor(Math.random() * 8)],
                  width: `${4 + Math.random() * 8}px`,
                  height: `${4 + Math.random() * 8}px`,
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Success Toast - Centered */}
      <div className="fixed inset-0 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 mx-auto max-w-sm w-full">
          <div className="flex items-center gap-3">
            {/* Success Icon */}
            <div className="w-12 h-12 bg-[var(--color-impact-green)] rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Issue Reported!
              </h3>
              <p className="text-sm text-gray-600 mb-2">{message}</p>
              <div className="flex items-center gap-2">
                <ImpactCoin size="md" />
                <span className="text-sm font-semibold text-[var(--color-impact-green)]">
                  +{reward} IMPACT earned!
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
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
          </div>
        </div>
      </div>
    </>
  );
};
