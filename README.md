# MediTrack Pro - Device CRM + Inventory Management Dashboard

A comprehensive, production-ready admin dashboard for managing medical device inventories, tracking installations, service visits, contract lifecycles (AMC/CMC), and maintaining facility-specific CRM histories with training, feedback, and photo documentation.

![MediTrack Pro Dashboard](https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## 🚀 Features

### Core Modules

#### 1. Device Inventory Dashboard
- **Comprehensive Device Management**: Display devices in table/card format with type, ID, facility, status tracking
- **Real-time Status Monitoring**: Online/Offline/Maintenance/Installation status with visual indicators
- **Battery Level Tracking**: Visual battery indicators with color-coded alerts (Red: ≤20%, Orange: ≤50%, Green: >50%)
- **Service History**: Last service/installation dates with automated scheduling
- **Contract Status**: AMC/CMC status tracking with expiry notifications
- **Advanced Filtering**: Filter by status, facility, device type, and engineer assignments
- **Search Functionality**: Global search across devices, facilities, and engineers
- **Grid/List View Toggle**: Switch between card and list views for optimal data visualization

#### 2. Installation & Training Module
- **Installation Scheduling**: Complete workflow for scheduling new device installations
- **Photo Documentation**: Upload unboxing photos, setup images, and completion documentation
- **Interactive Checklists**: Step-by-step installation checklists with progress tracking
- **Training Management**: Track staff training completion with certification status
- **Engineer Assignment**: Assign specialized engineers based on device type and expertise
- **Progress Monitoring**: Real-time progress bars and completion status
- **File Upload System**: Support for multiple file formats with drag-and-drop interface
- **Installation Notes**: Detailed notes and special instructions for each installation

#### 3. Service Visit Logs
- **Comprehensive Visit Tracking**: Log field visits with complete documentation
- **Engineer Management**: Assign responsible engineers with specialization matching
- **Visit Purpose Classification**: Preventive maintenance, breakdown repair, installation, training
- **Photo & Document Attachments**: Upload service photos, reports, and PDF documentation
- **Duration Tracking**: Monitor service visit duration for efficiency analysis
- **Status Management**: Track visit status from scheduled to completion
- **Notes System**: Detailed service notes with issue resolution tracking
- **Visit History**: Complete historical record of all service activities

#### 4. AMC/CMC Contract Tracker
- **Contract Lifecycle Management**: Track Annual Maintenance Contracts (AMC) and Comprehensive Maintenance Contracts (CMC)
- **Expiry Monitoring**: Automated alerts for contracts expiring within 30 days
- **Financial Tracking**: Contract value tracking with total portfolio value calculation
- **Vendor Management**: Track contract vendors and service providers
- **Contract Terms**: Detailed terms and conditions storage
- **Status Classification**: Active, Expired, Expiring Soon status management
- **Export Functionality**: Generate and export contract reports to CSV
- **Renewal Alerts**: Proactive notifications for contract renewals

#### 5. Alerts & Photo Management System
- **Intelligent Alert System**: Automated alerts for battery levels, service due dates, contract expirations
- **Severity Classification**: Critical, High, Medium, Low priority levels with color coding
- **Alert Resolution**: Track alert resolution with responsible person and timestamp
- **Photo Documentation**: Comprehensive photo logging for device conditions and issues
- **Alert History**: Complete audit trail of all alerts and resolutions
- **Device-Specific Alerts**: Contextual alerts linked to specific devices and facilities
- **Notification Dashboard**: Centralized notification center with unread count indicators

### Additional Features

#### 6. Facility Management
- **Facility Directory**: Complete facility information with contact details
- **Device Count Tracking**: Monitor number of devices per facility
- **Contact Management**: Store facility contact persons, phone numbers, and email addresses
- **Location Tracking**: Full address information with city, state, and pincode
- **Facility-Device Mapping**: Visual representation of device distribution across facilities

#### 7. Engineer Management
- **Engineer Profiles**: Complete engineer information with specializations
- **Workload Management**: Track active assignments and availability
- **Rating System**: Performance rating system for quality tracking
- **Specialization Matching**: Match engineers to devices based on expertise
- **Contact Information**: Phone and email contact details for quick communication

## 🛠 Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **State Management**: Redux Toolkit for predictable state management
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Form Handling**: React Hook Form for efficient form management
- **Date Handling**: date-fns for robust date manipulation
- **Build Tool**: Vite for fast development and optimized builds
- **Code Quality**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/           # React components organized by feature
│   ├── Layout/          # Layout components (Sidebar, Header, Layout)
│   ├── Dashboard/       # Dashboard overview components
│   ├── Devices/         # Device inventory components
│   ├── Installations/   # Installation management components
│   ├── ServiceVisits/   # Service visit components
│   ├── Contracts/       # Contract tracking components
│   ├── Alerts/          # Alert management components
│   ├── Facilities/      # Facility management components
│   └── Engineers/       # Engineer management components
├── store/               # Redux store configuration
│   ├── slices/         # Redux slices for each feature
│   └── index.ts        # Store configuration
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── dateUtils.ts    # Date manipulation utilities
│   └── statusUtils.ts  # Status and color utilities
├── hooks/              # Custom React hooks
└── App.tsx             # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd device-crm-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📊 Data Management

### Redux Store Structure

The application uses Redux Toolkit for state management with the following slices:

- **devicesSlice**: Device inventory management with filtering capabilities
- **installationsSlice**: Installation tracking and checklist management
- **serviceVisitsSlice**: Service visit logging and documentation
- **contractsSlice**: AMC/CMC contract lifecycle management
- **alertsSlice**: Alert system with resolution tracking
- **facilitiesSlice**: Facility information and device mapping
- **engineersSlice**: Engineer profiles and assignment tracking

### Sample Data

The application comes pre-loaded with realistic sample data including:
- 4 medical devices (Ventilator, Patient Monitor, Infusion Pump, Defibrillator)
- 3 healthcare facilities across different cities
- 4 specialized engineers with different expertise areas
- Active installations, service visits, and contracts
- Various alert types and severities

## 🎨 Design System

### Color Palette

- **Primary Blue**: #2563eb (Navigation, primary actions)
- **Secondary Green**: #10b981 (Success states, active status)
- **Accent Orange**: #f59e0b (Warnings, pending states)
- **Error Red**: #dc2626 (Errors, critical alerts)
- **Neutral Grays**: #f8fafc to #1f2937 (Backgrounds, text)

### Typography

- **Headings**: Inter font family with weights 600-800
- **Body Text**: Inter font family with weights 400-500
- **Line Heights**: 150% for body text, 120% for headings
- **Font Sizes**: Responsive scale from 12px to 32px

### Spacing System

- **Base Unit**: 8px spacing system for consistent layouts
- **Component Padding**: 16px, 24px for cards and containers
- **Section Margins**: 24px, 32px for major sections
- **Grid Gaps**: 16px, 24px for responsive grids

## 🔧 Key Components

### DeviceCard
Displays individual device information with status indicators, battery levels, and action buttons.

### InstallationForm
Comprehensive form for scheduling installations with file upload, engineer assignment, and checklist creation.

### AlertsPanel
Centralized alert management with severity filtering, resolution tracking, and notification counts.

### ContractTracker
Contract lifecycle management with expiry monitoring, financial tracking, and export capabilities.

### ServiceVisitsList
Service visit documentation with photo uploads, engineer assignments, and status tracking.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px (Single column layouts, collapsible navigation)
- **Tablet**: 768px - 1024px (Two-column layouts, condensed navigation)
- **Desktop**: 1024px+ (Multi-column layouts, full navigation)

### Mobile Optimizations
- Touch-friendly button sizes (minimum 44px)
- Swipe gestures for card interactions
- Collapsible sidebar navigation
- Optimized form layouts for mobile input

## 🔐 Security Features

- **Input Validation**: Comprehensive form validation using React Hook Form
- **XSS Protection**: Sanitized user inputs and safe rendering
- **File Upload Security**: File type validation and size limits
- **Data Persistence**: Secure local storage with error handling

## 🚀 Performance Optimizations

- **Code Splitting**: Lazy loading of components for faster initial load
- **Memoization**: React.memo and useMemo for expensive calculations
- **Optimized Images**: Responsive images with proper sizing
- **Bundle Optimization**: Vite's built-in optimizations for production builds

## 📈 Future Enhancements

### Planned Features
- **QR Code Scanner**: Device identification using camera
- **Role-Based Access**: Admin, Technician, and Viewer roles
- **Dark Theme**: Complete dark mode implementation
- **Advanced Analytics**: Device performance and service analytics
- **Mobile App**: React Native companion app
- **Real-time Sync**: WebSocket integration for live updates
- **Advanced Reporting**: Custom report builder with charts
- **Integration APIs**: Third-party system integrations

### Technical Improvements
- **PWA Support**: Progressive Web App capabilities
- **Offline Mode**: Offline data synchronization
- **Push Notifications**: Browser push notifications for alerts
- **Advanced Search**: Elasticsearch integration
- **Data Export**: Multiple export formats (PDF, Excel, CSV)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write comprehensive tests for new features
- Follow the established component structure
- Use semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation for common solutions
- Review the component examples for implementation guidance

## 🙏 Acknowledgments

- **React Team** for the excellent framework
- **Redux Toolkit** for simplified state management
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icon library
- **Vite** for the fast build tool
- **Medical Device Industry** for inspiration and requirements

---

**Built with ❤️ for the healthcare industry**

*MediTrack Pro - Streamlining medical device management for better patient care*
