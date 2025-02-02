import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const TransferStatus = ({ latestTransfer = null, transferHistory = [] }) => {
  if (!Array.isArray(transferHistory)) {
    transferHistory = [];
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Latest Transfer Status */}
      {latestTransfer && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Current Transfer Status</h3>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              {getStatusIcon(latestTransfer.status)}
              <div>
                <p className="font-medium">{latestTransfer.amount || '0'} Tokens</p>
                <p className="text-sm text-gray-500 truncate max-w-[200px]">
                  To: {latestTransfer.destinationChain || 'N/A'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium capitalize">{latestTransfer.status || 'Unknown'}</p>
              <p className="text-xs text-gray-500">{latestTransfer.timestamp || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Transfer History */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Transfer History</h3>
        {transferHistory.length > 0 ? (
          <div className="space-y-4">
            {transferHistory.map((transfer, index) => (
              <div
                key={transfer?.id || index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(transfer?.status)}
                  <div>
                    <p className="font-medium">{transfer?.amount || '0'} Tokens</p>
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">
                      To: {transfer?.destinationChain || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium capitalize">{transfer?.status || 'Unknown'}</p>
                  <p className="text-xs text-gray-500">{transfer?.timestamp || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No transfer history available
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferStatus;