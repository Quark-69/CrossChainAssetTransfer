import React from 'react';

const WalletConnect = ({ isConnected, loading, connectWallet, account, balance }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 px-6 py-12">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8">
        
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Connect Your Wallet
        </h2>
        
        {/* Wallet Status */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <span className="text-gray-600 text-lg">Wallet Status:</span>
          <span className={`text-lg font-semibold px-4 py-2 rounded-lg ${isConnected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
        </div>

        {/* Connect Button */}
        {!isConnected && (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg 
                     hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        )}

        {/* Account & Balance */}
        {isConnected && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Account:</span>
              <span className="font-mono text-sm bg-gray-200 px-3 py-1 rounded-md">{account}</span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-600 font-medium">Balance:</span>
              <span className="font-semibold text-lg">{balance} Tokens</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WalletConnect;
