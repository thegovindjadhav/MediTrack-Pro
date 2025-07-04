import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Plus, Calendar, User, MapPin, CheckCircle } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { getStatusColor } from '../../utils/statusUtils';
import InstallationForm from './InstallationForm';

const InstallationList: React.FC = () => {
  const installations = useSelector((state: RootState) => state.installations.installations);
  const devices = useSelector((state: RootState) => state.devices.devices);
  const facilities = useSelector((state: RootState) => state.facilities.facilities);
  
  const [showForm, setShowForm] = useState(false);

  const getDeviceInfo = (deviceId: string) => {
    return devices.find(device => device.id === deviceId);
  };

  const getFacilityInfo = (facilityId: string) => {
    return facilities.find(facility => facility.id === facilityId);
  };

  const handleFormSubmit = (data: any) => {
    console.log('Installation scheduled:', data);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Schedule Installation</h1>
        </div>
        <InstallationForm
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Installation & Training</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Installation</span>
        </button>
      </div>

      {/* Installation Cards */}
      <div className="grid gap-6">
        {installations.map(installation => {
          const device = getDeviceInfo(installation.deviceId);
          const facility = getFacilityInfo(installation.facilityId);
          const completedTasks = installation.checklist.filter(task => task.completed).length;
          const totalTasks = installation.checklist.length;
          const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

          return (
            <div key={installation.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {device?.model || 'Unknown Device'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Installation ID: {installation.id}
                  </p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(installation.status)}`}>
                  {installation.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Installation Date</p>
                    <p className="text-sm font-medium">{formatDate(installation.installationDate)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Engineer</p>
                    <p className="text-sm font-medium">{installation.engineerName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Facility</p>
                    <p className="text-sm font-medium">{facility?.name || 'Unknown Facility'}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{completedTasks}/{totalTasks} tasks</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-gray-700">Installation Checklist</h4>
                {installation.checklist.slice(0, 3).map(task => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <CheckCircle className={`w-4 h-4 ${task.completed ? 'text-green-600' : 'text-gray-300'}`} />
                    <span className={`text-sm ${task.completed ? 'text-gray-600 line-through' : 'text-gray-900'}`}>
                      {task.task}
                    </span>
                  </div>
                ))}
                {installation.checklist.length > 3 && (
                  <p className="text-xs text-gray-500 ml-6">
                    +{installation.checklist.length - 3} more tasks
                  </p>
                )}
              </div>

              {/* Training Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700">Training Status</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  installation.trainingCompleted ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'
                }`}>
                  {installation.trainingCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>

              {/* Photos */}
              {installation.photos.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Photos ({installation.photos.length})</h4>
                  <div className="flex space-x-2">
                    {installation.photos.slice(0, 3).map(photo => (
                      <img
                        key={photo.id}
                        src={photo.url}
                        alt={photo.filename}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                    {installation.photos.length > 3 && (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">+{installation.photos.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {installation.notes && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{installation.notes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {installations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No installations scheduled</div>
          <p className="text-gray-500">Click "Schedule Installation" to get started</p>
        </div>
      )}
    </div>
  );
};

export default InstallationList;