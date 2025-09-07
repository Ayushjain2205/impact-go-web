import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";

interface MobileOnlyWrapperProps {
  children: React.ReactNode;
}

export const MobileOnlyWrapper: React.FC<MobileOnlyWrapperProps> = ({
  children,
}) => {
  const [isMobile, setIsMobile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Consider mobile if width is less than 768px OR if it's a mobile device based on user agent
      const isMobileWidth = width < 768;
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsMobile(isMobileWidth || isMobileDevice);
      setIsLoading(false);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4"></div>
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isMobile) {
    // Generate random dots for background pattern
    const generateDots = () => {
      const dots = [];
      for (let i = 0; i < 20; i++) {
        dots.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 2,
        });
      }
      return dots;
    };

    const dots = generateDots();

    return (
      <div className="fixed inset-0 w-screen h-screen z-50 overflow-hidden">
        {/* Main gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #3DDC84 100%)",
          }}
        />

        {/* Background pattern dots */}
        <div className="absolute inset-0 opacity-10">
          {dots.map((dot) => (
            <div
              key={dot.id}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${dot.left}%`,
                top: `${dot.top}%`,
                animationDelay: `${dot.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center justify-center h-full relative z-10">
          {/* Logo Container */}
          <div className="mb-8">
            <div
              className="relative animate-splash-pulse"
              style={{
                filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
              }}
            >
              {/* Logo Icon with gradient */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center border-4"
                style={{
                  background:
                    "linear-gradient(135deg, #3DDC84 0%, #2ECC71 100%)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Lightning bolt icon */}
                <Zap width={48} height={48} color="white" />
              </div>
            </div>
          </div>

          {/* App Title */}
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

          {/* Tagline */}
          <p
            className="text-base font-sans text-center tracking-wide mb-8"
            style={{
              color: "#64748B",
              letterSpacing: "1px",
            }}
          >
            Hunt. Report. Impact.
          </p>

          {/* Mobile Message */}
          <div className="text-center">
            <div className="text-6xl mb-4">📱</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Please use a mobile device
            </h2>
            <p className="text-gray-600">
              This app is designed for mobile use only.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
