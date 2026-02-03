
export type InterfaceType = 'Programme' | 'Progress';

export interface Machinery {
  id: string;
  type: string;
  startTime: string;
  endTime: string;
  quantity: number;
  unit: string;
}

export interface Manpower {
  id: string;
  role: string;
  startTime: string;
  endTime: string;
  quantity: number;
  unit: string;
}

export interface Material {
  id: string;
  item: string;
  unit: string;
  quantity: number;
}

export interface ActivityOption {
  boqItem: string;
  activityCode: string;
  description: string;
}

export interface ActivityRecord {
  id: string;
  date: string;
  userName: string;
  type: InterfaceType;
  boqItem: string;
  activityCode: string;
  activity: string;
  side: 'LHS' | 'RHS' | 'B/S' | '';
  startChainage: string;
  endChainage: string;
  startTime: string;
  endTime: string;
  machinery: Machinery[];
  manpower: Manpower[];
  materials: Material[];
  images: string[];
  status: 'draft' | 'submitted';
  timestamp: number;
}

export interface DropdownData {
  activities: ActivityOption[];
  machineryTypes: string[];
  manpowerRoles: string[];
  materials: string[];
  units: string[];
}
