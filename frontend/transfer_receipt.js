import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

const TransferReceipt = ({ transfer = {} }) => {
  // Early return if no transfer data
  if (!transfer || Object.keys(transfer).length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          No transfer data available
        </div>
      </div>
    );
  }

  const {
    id = 'N/A',
    timestamp = 'N/A',
    sourceAccount = 'N/A',
    destinationChain = 'N/A',
    amount = '0',
    status = 'N/A',
    fee = '0',
    hash = ''
  } = transfer;

  const handleDownload = () => {
    // Create receipt data with safely accessed properties
    const receiptData = {
      transactionId: id,
      timestamp,
      from: sourceAccount,
      to: destinationChain,
      amount,
      status,
      fee,
      hash
    };

    // Create blob and download
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transfer-receipt-${id}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Transfer Receipt</h3>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Transaction ID</p>
            <p className="font-medium">{id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Timestamp</p>
            <p className="font-medium">{timestamp}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="font-medium font-mono text-sm truncate">{sourceAccount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">To</p>
            <p className="font-medium font-mono text-sm truncate">{destinationChain}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="font-medium">{amount} Tokens</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fee</p>
            <p className="font-medium">{fee} Tokens</p>
          </div>
        </div>

        {hash && (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Transaction Hash</p>
              <p className="font-mono text-sm truncate max-w-[200px]">{hash}</p>
            </div>
            <a
              href={`https://etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Explorer</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferReceipt;