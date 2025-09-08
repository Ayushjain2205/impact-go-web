import { useSolanaWallet } from "@web3auth/modal/react/solana";
import { LAMPORTS_PER_SOL, PublicKey, Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export function Balance() {
  const { accounts } = useSolanaWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a custom connection to devnet to avoid 403 errors
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  const fetchBalance = async () => {
    if (connection && accounts && accounts.length > 0) {
      try {
        setIsLoading(true);
        setError(null);
        const publicKey = new PublicKey(accounts[0]);
        const balance = await connection.getBalance(publicKey);
        setBalance(balance);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.log("error", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [connection, accounts]);

  return (
    <div className="flex items-center gap-2">
      <span>Balance:</span>
      <div className="flex items-center gap-1">
        <span>
          {balance !== null ? `${balance / LAMPORTS_PER_SOL} SOL` : "0 SOL"}
        </span>
        {isLoading && <span className="text-xs">Loading...</span>}
        {error && <span className="text-xs text-red-500">Error</span>}
        <button
          onClick={fetchBalance}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Refresh balance"
        >
          <RefreshCw size={14} />
        </button>
      </div>
    </div>
  );
}
