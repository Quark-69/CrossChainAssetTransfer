import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WalletConnectPage from './WalletConnectPage';
import TransferPage from './TransferPage';
import TransferStatus from './TransferStatus';
import TransferReceipt from './TransferReceipt';

const App = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [transferHistory, setTransferHistory] = useState([]);
  const [latestTransfer, setLatestTransfer] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // ... (previous MetaMask connection code remains the same)

  // Fetch transfer history
  const fetchTransferHistory = async (accountAddress) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/transfers/${accountAddress}`);
      setTransferHistory(response.data);
    } catch (err) {
      setError('Error fetching transfer history: ' + err.message);
    }
  };

  // Poll for transfer status updates
  const pollTransferStatus = async (transferId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/transfer/${transferId}`);
      setLatestTransfer(response.data);

      if (response.data.status === 'completed' || response.data.status === 'failed') {
        // Update transfer history and stop polling
        fetchTransferHistory(account);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error polling transfer status:', err);
      return true; // Stop polling on error
    }
  };

  // Handle transfer request
  const handleTransfer = async (transferData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/transfer', {
        ...transferData,
        sourceAccount: account
      });
      
      setLatestTransfer(response.data);
      setShowReceipt(true);

      // Start polling for status updates
      const pollInterval = setInterval(async () => {
        const shouldStop = await pollTransferStatus(response.data.id);
        if (shouldStop) {
          clearInterval(pollInterval);
        }
      }, 5000); // Poll every 5 seconds

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };

  // Effect to fetch transfer history when account changes
  useEffect(() => {
    if (account) {
      fetchTransferHistory(account);
    }
  }, [account]);

  return (
    <div className="min-h-screen bg-gray-100">
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          {error}
          <button onClick={() => setError('')} className="ml-4 text-sm underline">
            Dismiss
          </button>
        </div>
      )}

      {!isConnected ? (
        <WalletConnectPage onConnect={handleAccountConnection} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Transfer Form */}
            <div>
              <TransferPage
                account={account}
                balance={balance}
                onTransfer={handleTransfer}
              />
            </div>

            {/* Status and History */}
            <div className="space-y-8">
              <TransferStatus
                latestTransfer={latestTransfer}
                transferHistory={transferHistory}
              />
              
              {showReceipt && latestTransfer && (
                <TransferReceipt
                  transfer={latestTransfer}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;