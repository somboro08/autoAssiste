// --- Types & Interfaces for Meca App ---

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  subscription: 'basic' | 'premium' | 'gold';
  vehicles: Vehicle[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  fuelType: 'diesel' | 'gasoline' | 'electric' | 'hybrid';
  status: 'excellent' | 'good' | 'needs_attention' | 'critical';
  lastService: string;
  nextService: string;
  mileage: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile_money' | 'bank_transfer';
  lastFour: string;
  isDefault: boolean;
}

export interface UserPreferences {
  notifications: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
  language: 'fr' | 'en';
  theme: 'light' | 'dark' | 'auto';
}

export interface ServiceRequest {
  id: string;
  type: 'tire' | 'battery' | 'engine' | 'fuel' | 'towing' | 'other';
  status: 'pending' | 'assigned' | 'on_way' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  estimatedTime: number;
  assignedMechanic?: Mechanic;
  location: string;
  cost?: number;
}

export interface Mechanic {
  id: string;
  name: string;
  rating: number;
  experience: number;
  specialties: string[];
  location: string;
  available: boolean;
  responseTime: number;
}

export interface AiDiagnosis {
  issue_title: string;
  severity: 'Mineure' | 'Modéré' | 'Critique';
  risk_level: 'Bas' | 'Moyen' | 'Élevé';
  time_estimate: string;
  estimated_cost: string;
  recommended_action: string;
  safety_steps: string[];
  parts_needed: string[];
  mechanic_type: string;
}

export interface MissionData {
  id: string;
  type: string;
  client: string;
  vehicle: string;
  location: string;
  status: 'completed' | 'in_progress' | 'pending';
  price: number;
  duration?: number;
  rating?: number;
}

export interface MechanicStats {
  completed: number;
  rating: number;
  responseTime: number;
  satisfaction: number;
}

export interface MechanicEarnings {
  today: number;
  week: number;
  month: number;
  total: number;
}
