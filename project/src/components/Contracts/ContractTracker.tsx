import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Plus, Calendar, DollarSign, Building, AlertTriangle, Download } from 'lucide-react';
import { formatDate, getDaysUntilDate } from '../../utils/dateUtils';
import { getStatusColor } from '../../utils/statusUtils';

const ContractTracker: React.FC = () => {
  const contracts = useSelector((state: RootState) => state.contracts.contracts);
  const devices = useSelector((state: RootState) => state.devices.devices);
  const facilities = useSelector((state: RootState) => state.facilities.facilities);
  
  const [filter, setFilter] = useState('all');
  const [contractType, setContractType] = useState('all');

  const getDeviceInfo = (deviceId: string) => {
    return devices.find(device => device.id === deviceId);
  };

  const getFacilityInfo = (deviceId: string) => {
    const device = getDeviceInfo(deviceId);
    return device ? facilities.find(facility => facility.id === device.facilityId) : null;
  };

  const filteredContracts = contracts.filter(contract => {
    const statusMatch = filter === 'all' || contract.status.toLowerCase().replace(' ', '-') === filter;
    const typeMatch = contractType === 'all' || contract.type === contractType;
    return statusMatch && typeMatch;
  });

  const getUrgencyColor = (endDate: string) => {
    const daysUntil = getDaysUntilDate(endDate);
    if (daysUntil < 0) return 'text-red-600';
    if (daysUntil <= 30) return 'text-orange-600';
    return 'text-green-600';
  };

  const exportContracts = () => {
    // In a real application, this would generate and download a CSV file
    console.log('Exporting contracts...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">AMC/CMC Contract Tracker</h1>
        <div className="flex space-x-3">
          <button 
            onClick={exportContracts}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Contract</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Contracts</p>
              <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Contracts</p>
              <p className="text-2xl font-bold text-green-600">
                {contracts.filter(c => c.status === 'Active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600">
                {contracts.filter(c => c.status === 'Expiring Soon').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{contracts.reduce((sum, c) => sum + c.cost, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex space-x-2">
            <span className="text-sm font-medium text-gray-700 py-2">Status:</span>
            {['all', 'active', 'expiring-soon', 'expired'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
          <div className="flex space-x-2">
            <span className="text-sm font-medium text-gray-700 py-2">Type:</span>
            {['all', 'AMC', 'CMC'].map(type => (
              <button
                key={type}
                onClick={() => setContractType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  contractType === type
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contracts List */}
      <div className="grid gap-6">
        {filteredContracts.map(contract => {
          const device = getDeviceInfo(contract.deviceId);
          const facility = getFacilityInfo(contract.deviceId);
          const daysUntilExpiry = getDaysUntilDate(contract.endDate);

          return (
            <div key={contract.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {contract.type} Contract - {device?.model || 'Unknown Device'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Contract ID: {contract.id}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    contract.type === 'AMC' ? 'text-blue-600 bg-blue-50' : 'text-purple-600 bg-purple-50'
                  }`}>
                    {contract.type}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-sm font-medium">{formatDate(contract.startDate)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">End Date</p>
                    <p className={`text-sm font-medium ${getUrgencyColor(contract.endDate)}`}>
                      {formatDate(contract.endDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Contract Value</p>
                    <p className="text-sm font-medium">₹{contract.cost.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Facility</p>
                    <p className="text-sm font-medium">{facility?.name || 'Unknown Facility'}</p>
                  </div>
                </div>
              </div>

              {/* Expiry Warning */}
              {daysUntilExpiry >= 0 && daysUntilExpiry <= 30 && (
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <p className="text-sm font-medium text-orange-800">
                      Contract expires in {daysUntilExpiry} days
                    </p>
                  </div>
                </div>
              )}

              {/* Device Details */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Device Details</p>
                    <p className="text-sm text-gray-600">
                      {device?.type} - {device?.serialNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Vendor</p>
                    <p className="text-sm text-gray-600">{contract.vendor}</p>
                  </div>
                </div>
              </div>

              {/* Contract Terms */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-1">Contract Terms</h4>
                <p className="text-sm text-blue-800">{contract.terms}</p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No contracts found</div>
          <p className="text-gray-500">
            {filter === 'all' && contractType === 'all' 
              ? 'No contracts available' 
              : 'No contracts match the selected filters'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ContractTracker;