export interface Device {
  id: string;
  type: string;
  model: string;
  serialNumber: string;
  facilityId: string;
  facilityName: string;
  status: 'Online' | 'Offline' | 'Maintenance' | 'Installation';
  batteryLevel: number;
  lastServiceDate: string;
  installationDate: string;
  amcStatus: 'Active' | 'Expired' | 'Expiring Soon';
  cmcStatus: 'Active' | 'Expired' | 'Expiring Soon';
  location: string;
  engineer: string;
}

export interface Installation {
  id: string;
  deviceId: string;
  facilityId: string;
  engineerId: string;
  engineerName: string;
  installationDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  checklist: ChecklistItem[];
  photos: Photo[];
  trainingCompleted: boolean;
  notes: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
  completedBy?: string;
  completedAt?: string;
}

export interface ServiceVisit {
  id: string;
  deviceId: string;
  facilityId: string;
  engineerId: string;
  engineerName: string;
  visitDate: string;
  purpose: 'Preventive' | 'Breakdown' | 'Installation' | 'Training';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  notes: string;
  photos: Photo[];
  attachments: Attachment[];
  duration: number; // in minutes
}

export interface Photo {
  id: string;
  filename: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  category: 'Unboxing' | 'Installation' | 'Maintenance' | 'Issue' | 'Training';
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Contract {
  id: string;
  deviceId: string;
  type: 'AMC' | 'CMC';
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Expiring Soon';
  cost: number;
  vendor: string;
  terms: string;
}

export interface Alert {
  id: string;
  type: 'Battery Low' | 'Service Due' | 'Contract Expiring' | 'Device Offline' | 'Maintenance Required';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  deviceId: string;
  facilityId: string;
  message: string;
  createdAt: string;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface Facility {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  deviceCount: number;
}

export interface Engineer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  activeAssignments: number;
  rating: number;
}