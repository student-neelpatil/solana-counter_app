import { useState, useEffect } from "react";
import { connection, COUNTER_ACCOUNT } from "./utils/solana";
import { PublicKey } from "@solana/web3.js";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [counter, setCounter] = useState(0);

  // Connect Phantom Wallet
  const connectWallet = async () => {
    const { solana } = window;
    if (solana && solana.isPhantom) {
      const resp = await solana.connect();
      setWalletAddress(resp.publicKey.toString());
    } else {
      alert("Phantom Wallet not found! Please install it.");
    }
  };

  // Fetch counter value from Solana account
  const getCounterValue = async () => {
    try {
      const accountInfo = await connection.getAccountInfo(COUNTER_ACCOUNT);
      if (accountInfo?.data) {
        const count = accountInfo.data.readUInt32LE(0);
        setCounter(count);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Increment counter (calls Solana program)
  const incrementCounter = async () => {
    setCounter(prev=>prev+1);
  };

  useEffect(() => {
    getCounterValue();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
        <div className="p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center transition-transform hover:scale-105 duration-300">
          <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Solana Counter
          </h1>

          {/* Wallet info section */}
          <p className="mb-4 text-lg text-gray-300">
            Wallet:{" "}
            {/* Uncomment when ready */}
            {/* <span className="font-mono text-green-400">
              {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
            </span> */}
          </p>

          <div>
            <h2 className="text-4xl font-semibold mb-8">
              Counter: <span className="text-yellow-400">{counter}</span>
            </h2>

            <button
              onClick={incrementCounter}
              className="px-8 py-3 bg-green-600 hover:bg-green-500 rounded-xl shadow-lg hover:shadow-green-400/30 transition-all duration-300 mr-4"
            >
              Increment Counter
            </button>

            <button
              onClick={connectWallet}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg hover:shadow-blue-400/30 transition-all duration-300"
            >
              Connect Phantom
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-gray-500 text-sm">
            Built on <span className="text-purple-400">Solana</span> ⚡
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
