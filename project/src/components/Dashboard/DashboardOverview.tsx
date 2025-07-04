import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Package, Wrench, AlertTriangle, Building, TrendingUp, Calendar } from 'lucide-react';
import { formatDate, getContractStatus } from '../../utils/dateUtils';

const DashboardOverview: React.FC = () => {
  const devices = useSelector((state: RootState) => state.devices.devices);
  const installations = useSelector((state: RootState) => state.installations.installations);
  const serviceVisits = useSelector((state: RootState) => state.serviceVisits.serviceVisits);
  const contracts = useSelector((state: RootState) => state.contracts.contracts);
  const alerts = useSelector((state: RootState) => state.alerts.alerts);
  const facilities = useSelector((state: RootState) => state.facilities.facilities);

  const stats = [
    {
      label: 'Total Devices',
      value: devices.length,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      label: 'Active Installations',
      value: installations.filter(inst => inst.status === 'In Progress').length,
      icon: Wrench,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      label: 'Open Alerts',
      value: alerts.filter(alert => !alert.resolved).length,
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '-5%',
      changeType: 'decrease'
    },
    {
      label: 'Total Facilities',
      value: facilities.length,
      icon: Building,
      color: 'bg-purple-500',
      change: '+2%',
      changeType: 'increase'
    }
  ];

  const recentActivities = [
    { type: 'Installation', device: 'Ventilator MV3000-001', facility: 'City General Hospital', time: '2 hours ago' },
    { type: 'Service Visit', device: 'Patient Monitor CW500-045', facility: 'Metro Medical Center', time: '4 hours ago' },
    { type: 'Alert Resolved', device: 'Infusion Pump FM200-078', facility: 'City General Hospital', time: '1 day ago' },
    { type: 'Contract Renewed', device: 'Defibrillator LS-AED-023', facility: 'Community Health Clinic', time: '2 days ago' }
  ];

  const upcomingExpirations = contracts
    .filter(contract => getContractStatus(contract.endDate) === 'Expiring Soon')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {formatDate(new Date())}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`w-4 h-4 mr-1 ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{activity.type}</span>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.device}</p>
                  <p className="text-xs text-gray-500">{activity.facility}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Contract Expirations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Contract Expirations</h3>
          <div className="space-y-4">
            {upcomingExpirations.length > 0 ? (
              upcomingExpirations.map((contract, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-orange-50 rounded-lg transition-colors border border-orange-200">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{contract.type}</span>
                      <span className="text-sm text-orange-600 font-medium">{formatDate(contract.endDate)}</span>
                    </div>
                    <p className="text-sm text-gray-600">Device: {contract.deviceId}</p>
                    <p className="text-xs text-gray-500">Vendor: {contract.vendor}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming expirations</p>
            )}
          </div>
        </div>
      </div>

      {/* Device Status Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Status Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Online', 'Offline', 'Maintenance', 'Installation'].map((status) => {
            const count = devices.filter(device => device.status === status).length;
            const percentage = devices.length > 0 ? ((count / devices.length) * 100).toFixed(1) : '0';
            return (
              <div key={status} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{status}</div>
                <div className="text-xs text-gray-500">{percentage}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;