import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { resolveAlert } from '../../store/slices/alertsSlice';
import { AlertTriangle, Battery, Calendar, Wrench, X, Check } from 'lucide-react';
import { formatDateTime } from '../../utils/dateUtils';
import { getSeverityColor } from '../../utils/statusUtils';

const AlertsPanel: React.FC = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootState) => state.alerts.alerts);
  const devices = useSelector((state: RootState) => state.devices.devices);
  const facilities = useSelector((state: RootState) => state.facilities.facilities);

  const getDeviceInfo = (deviceId: string) => {
    return devices.find(device => device.id === deviceId);
  };

  const getFacilityInfo = (facilityId: string) => {
    return facilities.find(facility => facility.id === facilityId);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'Battery Low':
        return <Battery className="w-5 h-5" />;
      case 'Service Due':
        return <Wrench className="w-5 h-5" />;
      case 'Contract Expiring':
        return <Calendar className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const handleResolveAlert = (alertId: string) => {
    dispatch(resolveAlert({ id: alertId, resolvedBy: 'Current User' }));
  };

  const unresolvedAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            {unresolvedAlerts.length} unresolved alerts
          </div>
        </div>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Critical', 'High', 'Medium', 'Low'].map(severity => {
          const count = unresolvedAlerts.filter(alert => alert.severity === severity).length;
          return (
            <div key={severity} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{severity} Priority</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-3 rounded-full ${getSeverityColor(severity)}`}>
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unresolved Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Unresolved Alerts</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {unresolvedAlerts.length > 0 ? (
            unresolvedAlerts.map(alert => {
              const device = getDeviceInfo(alert.deviceId);
              const facility = getFacilityInfo(alert.facilityId);

              return (
                <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{alert.type}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Device: {device?.model || 'Unknown'}</span>
                          <span>Facility: {facility?.name || 'Unknown'}</span>
                          <span>{formatDateTime(alert.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>Resolve</span>
                      </button>
                      <button className="flex items-center space-x-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm transition-colors">
                        <X className="w-4 h-4" />
                        <span>Dismiss</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-gray-500">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>No unresolved alerts</p>
            </div>
          )}
        </div>
      </div>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recently Resolved</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {resolvedAlerts.slice(0, 5).map(alert => {
              const device = getDeviceInfo(alert.deviceId);
              const facility = getFacilityInfo(alert.facilityId);

              return (
                <div key={alert.id} className="p-6 opacity-75">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{alert.type}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Resolved
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Device: {device?.model || 'Unknown'}</span>
                        <span>Facility: {facility?.name || 'Unknown'}</span>
                        <span>Resolved: {formatDateTime(alert.resolvedAt!)}</span>
                        <span>By: {alert.resolvedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;