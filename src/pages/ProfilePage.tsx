import React from "react";
import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from "@web3auth/modal/react";
import { useSolanaWallet } from "@web3auth/modal/react/solana";
import { ArrowLeft } from "lucide-react";
import { SignTransaction } from "../components/signTransaction";
import { Balance } from "../components/getBalance";
import { SendVersionedTransaction } from "../components/sendVersionedTransaction";
import { SignMessage } from "../components/signMessage";
import { SwitchChain } from "../components/switchNetwork";

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
    <div className="grid gap-4 w-full">
      <h2 className="text-2xl font-semibold my-6">
        Connected to {connectorName}
      </h2>
      <div className="text-sm font-mono bg-gray-100 p-2 rounded">
        {accounts?.[0]}
      </div>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => uiConsole(userInfo)}
          className="flex-1 min-w-0 p-3 bg-gray-50 border border-gray-200 rounded text-center font-medium hover:bg-gray-100 transition-colors"
        >
          Get User Info
        </button>
        <button
          onClick={() => disconnect()}
          className="flex-1 min-w-0 p-3 bg-gray-50 border border-gray-200 rounded text-center font-medium hover:bg-gray-100 transition-colors"
        >
          Log Out
        </button>
      </div>
      {disconnectLoading && (
        <div className="text-[var(--color-impact-green)]">Disconnecting...</div>
      )}
      {disconnectError && (
        <div className="text-red-500">{disconnectError.message}</div>
      )}
      <Balance />
      <SignMessage />
      <SignTransaction />
      <SendVersionedTransaction />
      <SwitchChain />
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
      <div className="min-h-screen bg-white flex flex-col">
        <div className="bg-gradient-to-b from-gray-100 via-gray-100 to-green-100 p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBackToHome}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-gray-800">IMPACT GO</h1>
              <p className="text-sm text-gray-600 bg-white bg-opacity-70 px-2 py-1 rounded inline-block font-mono">
                {accounts?.[0]?.slice(0, 8)}...{accounts?.[0]?.slice(-8)}
              </p>
            </div>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto">{loggedInView}</div>

        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => disconnect()}
            className="w-full py-3 px-6 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            {disconnectLoading ? "Disconnecting..." : "Log Out"}
          </button>
          {disconnectError && (
            <div className="text-red-500 text-sm mt-4 text-center">
              {disconnectError.message}
            </div>
          )}
        </div>

        <div
          id="console"
          className="whitespace-pre-line p-4 bg-black text-green-400 font-mono text-sm max-h-60 overflow-auto"
        >
          <p className="whitespace-pre-line"></p>
        </div>
      </div>
    );
  }

  // Show login screen
  return unloggedInView;
};
