export interface DietaryRestriction {
  type: 'allergy' | 'preference' | 'medical';
  name: string;
  severity?: 'low' | 'medium' | 'high';
  notes?: string;
}
