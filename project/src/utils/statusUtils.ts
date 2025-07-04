import { Device } from '../types';

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'online':
    case 'active':
    case 'completed':
      return 'text-green-600 bg-green-50';
    case 'offline':
    case 'expired':
    case 'cancelled':
      return 'text-red-600 bg-red-50';
    case 'maintenance':
    case 'expiring soon':
    case 'in progress':
      return 'text-orange-600 bg-orange-50';
    case 'installation':
    case 'pending':
    case 'scheduled':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const getBatteryColor = (level: number): string => {
  if (level <= 20) return 'text-red-600';
  if (level <= 50) return 'text-orange-600';
  return 'text-green-600';
};

export const getSeverityColor = (severity: string): string => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-600 bg-red-50';
    case 'high':
      return 'text-orange-600 bg-orange-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const getDeviceTypeIcon = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'ventilator':
      return '🫁';
    case 'patient monitor':
      return '📊';
    case 'infusion pump':
      return '💉';
    case 'defibrillator':
      return '⚡';
    default:
      return '🏥';
  }
};