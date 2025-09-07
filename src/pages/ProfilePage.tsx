import React from "react";
import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from "@web3auth/modal/react";
import { useSolanaWallet } from "@web3auth/modal/react/solana";
import {
  ArrowLeft,
  Settings,
  MapPin,
  Calendar,
  DollarSign,
  Target,
  Trophy,
  CheckCircle,
  Coins,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { SignTransaction } from "../components/signTransaction";
import { Balance } from "../components/getBalance";
import { SendVersionedTransaction } from "../components/sendVersionedTransaction";
import { SignMessage } from "../components/signMessage";
import { SwitchChain } from "../components/switchNetwork";
import { ImpactCoin } from "../components/ImpactCoin";

export const ProfilePage: React.FC = () => {
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

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const loggedInView = (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">
              {(
                userInfo?.name ||
                userInfo?.email?.split("@")[0] ||
                "CivicHero42"
              )
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>

          {/* Username */}
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {userInfo?.name || userInfo?.email?.split("@")[0] || "CivicHero42"}
          </h2>

          {/* Title */}
          <p className="text-[var(--color-impact-green)] font-medium mb-3">
            Impact Hunter
          </p>

          {/* Wallet Address */}
          <div className="text-xs text-gray-500 mb-2">
            <a
              href={`https://solscan.io/account/${accounts?.[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono bg-gray-50 px-3 py-1 rounded hover:bg-gray-100 transition-colors flex items-center gap-1"
            >
              {accounts?.[0]?.slice(0, 8)}...{accounts?.[0]?.slice(-8)}
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Balance */}
          <div className="text-sm text-gray-600">
            <Balance />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Issues Reported */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Target size={20} className="text-green-600" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">23</div>
            <div className="text-sm text-gray-600">Issues Reported</div>
          </div>
        </div>

        {/* Rank */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Trophy size={20} className="text-yellow-600" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">#12</div>
            <div className="text-sm text-gray-600">Rank</div>
          </div>
        </div>

        {/* Verified */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">45</div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">
                Reported pothole on Market St
              </span>
            </div>
            <div className="flex items-center">
              <ImpactCoin size="sm" className="mr-1" />
              <span className="text-yellow-600 font-medium">25</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Verified broken streetlight</span>
            </div>
            <div className="flex items-center">
              <ImpactCoin size="sm" className="mr-1" />
              <span className="text-yellow-600 font-medium">15</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Completed community survey</span>
            </div>
            <div className="flex items-center">
              <ImpactCoin size="sm" className="mr-1" />
              <span className="text-yellow-600 font-medium">10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden functionality for debugging */}
      <div className="hidden">
        <Balance />
        <SignMessage />
        <SignTransaction />
        <SendVersionedTransaction />
        <SwitchChain />
      </div>
    </div>
  );

  const unloggedInView = (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-100 to-green-100 flex flex-col p-5 relative">
      {/* Back Button */}
      <div className="flex justify-start mb-4 relative z-10">
        <button
          onClick={handleBackToHome}
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
      </div>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                         radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "100px 100px, 150px 150px",
        }}
      ></div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center relative z-10 w-full max-w-xs">
          <div className="mb-6">
            <div className="w-16 h-16 bg-[var(--color-impact-green)] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">IMPACT GO</h1>
          <p className="text-gray-600 mb-8">Hunt. Report. Impact.</p>
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
    </div>
  );

  // Show mobile-first login or dashboard
  if (isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToHome}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-800" />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Profile</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={20} className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">{loggedInView}</div>

        {/* Footer with Logout */}
        <div className="bg-white border-t border-gray-200 p-4">
          <button
            onClick={() => disconnect()}
            className="w-full py-3 px-6 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            {disconnectLoading ? "Disconnecting..." : "Log Out"}
          </button>
          {disconnectError && (
            <div className="text-red-500 text-sm mt-2 text-center">
              {disconnectError.message}
            </div>
          )}
        </div>

        {/* Hidden console for debugging */}
        <div
          id="console"
          className="hidden whitespace-pre-line p-4 bg-black text-green-400 font-mono text-sm max-h-60 overflow-auto"
        >
          <p className="whitespace-pre-line"></p>
        </div>
      </div>
    );
  }

  // Show login screen
  return unloggedInView;
};
