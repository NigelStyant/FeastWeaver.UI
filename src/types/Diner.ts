import { DietaryRestriction } from "./DietaryRestriction";

export interface Diner {
  id: string;
  name: string;
  dietaryRestrictions?: DietaryRestriction[];
  description?: string;
  imageUrl?: string;
  likeTags?: string[];
  dislikeTags?: string[];
}
