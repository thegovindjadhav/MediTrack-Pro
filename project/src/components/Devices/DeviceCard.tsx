import React from 'react';
import { Device } from '../../types';
import { Battery, MapPin, Calendar, Wrench } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { getStatusColor, getBatteryColor, getDeviceTypeIcon } from '../../utils/statusUtils';

interface DeviceCardProps {
  device: Device;
  onEdit: (device: Device) => void;
  onDelete: (deviceId: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getDeviceTypeIcon(device.type)}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{device.model}</h3>
            <p className="text-sm text-gray-600">{device.type}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(device)}
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
          >
            <Wrench className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(device.id)}
            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Status</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(device.status)}`}>
            {device.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Battery</span>
          <div className="flex items-center space-x-2">
            <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
            <span className={`text-sm font-medium ${getBatteryColor(device.batteryLevel)}`}>
              {device.batteryLevel}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Location</span>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-900">{device.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Last Service</span>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-900">{formatDate(device.lastServiceDate)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Facility</span>
          <span className="text-sm text-gray-900">{device.facilityName}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Engineer</span>
          <span className="text-sm text-gray-900">{device.engineer}</span>
        </div>

        <div className="flex space-x-2 pt-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(device.amcStatus)}`}>
            AMC: {device.amcStatus}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(device.cmcStatus)}`}>
            CMC: {device.cmcStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;