export default interface IActivity {
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

interface ICategory {
  id: number;
  name: string;
  color: string;
}

interface ILevel {
  id: number;
  name: string;
  value: number;
}
