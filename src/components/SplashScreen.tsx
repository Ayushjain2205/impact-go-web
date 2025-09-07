import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState<
    "initial" | "visible" | "pulse" | "fadeOut"
  >("initial");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase("visible");
    }, 100);

    const pulseTimer = setTimeout(() => {
      setAnimationPhase("pulse");
    }, 1000);

    const fadeOutTimer = setTimeout(() => {
      setAnimationPhase("fadeOut");
    }, 3500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

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
      <div
        className={`flex flex-col items-center justify-center h-full relative z-10 ${
          animationPhase === "initial"
            ? "opacity-0"
            : animationPhase === "fadeOut"
            ? "opacity-0 scale-95 transition-all duration-500"
            : "opacity-100 animate-splash-bounce"
        }`}
      >
        {/* Logo Container */}
        <div className="mb-6">
          <div
            className={`relative transition-all duration-1000 ${
              animationPhase === "pulse" ? "animate-splash-pulse" : ""
            }`}
            style={{
              filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))",
            }}
          >
            {/* Logo Icon with gradient */}
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center border-4"
              style={{
                background: "linear-gradient(135deg, #3DDC84 0%, #2ECC71 100%)",
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
          className="text-base font-sans text-center tracking-wide"
          style={{
            color: "#64748B",
            letterSpacing: "1px",
          }}
        >
          Hunt. Report. Impact.
        </p>
      </div>
    </div>
  );
};
