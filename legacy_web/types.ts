export enum UserRole {
  DRIVER = 'DRIVER',
  MECHANIC = 'MECHANIC',
  GUEST = 'GUEST'
}

export enum Screen {
  ONBOARDING = 'ONBOARDING',
  DRIVER_HOME = 'DRIVER_HOME',
  MECHANIC_HOME = 'MECHANIC_HOME',
  SERVICE_BOOKING = 'SERVICE_BOOKING',
  IMAGE_ANALYSIS = 'IMAGE_ANALYSIS',
  PROFILE = 'PROFILE',
  MESSAGES = 'MESSAGES',
  BOOKINGS = 'BOOKINGS'
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  priceRange: string;
  duration: string;
}

export interface Mechanic {
  id: string;
  name: string;
  rating: number;
  completedJobs: number;
  isVerified: boolean;
  hourlyRate: number;
  avatarUrl: string;
  distance: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface AnalysisResult {
  diagnosis: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  recommendedService: string;
  estimatedCost: string;
}