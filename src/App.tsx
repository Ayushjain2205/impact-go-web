import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SplashScreen } from "./components/SplashScreen";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SquadsPage } from "./pages/SquadsPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
function App() {
  const [showSplash, setShowSplash] = React.useState(() => {
    // Only show splash screen if it hasn't been shown before
    return !localStorage.getItem("splashShown");
  });

  // Show splash screen only on first load
  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => {
          setShowSplash(false);
          localStorage.setItem("splashShown", "true");
        }}
      />
    );
  }

  // Show routing after splash screen
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/squads" element={<SquadsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
