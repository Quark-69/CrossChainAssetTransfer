import React, { useState } from 'react';

const TransferPage = ({ account, balance, onTransfer }) => {
  const [destinationChain, setDestinationChain] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onTransfer({
        sourceAccount: account,
        destinationChain,
        amount: transferAmount
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 px-6 py-12">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Cross-Chain Transfer
        </h2>

        {/* Connected Account Info */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-600">Connected Account:</span>
            <span className="font-mono text-sm bg-gray-200 px-3 py-1 rounded-md">{account}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Balance:</span>
            <span className="font-semibold">{balance} Tokens</span>
          </div>
        </div>

        {/* Transfer Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination Chain Address
              </label>
              <input
                type="text"
                value={destinationChain}
                onChange={(e) => setDestinationChain(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter destination chain address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Amount
              </label>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter amount to transfer"
                required
                min="0"
                step="0.000001"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg 
                       hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Processing Transfer...' : 'Transfer Tokens'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferPage;