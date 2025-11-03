export interface IActivity {
  id: number;
  name: string;
  description: string;
  duration: number; // en minutes
  min_height: number; // en cm
  pregnancy_warning: boolean;
  image_ref: string;
  category: ICategory;
  level: ILevel;
}

export interface ICategory {
  id: number;
  name: string;
  color: string;
}

export interface ILevel {
  id: number;
  name: string;
  value: number;
}
