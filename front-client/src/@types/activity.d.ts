export default interface IActivity {
  id: string;
  name: string;
  description: string;
  duration: number; // en minutes
  min_height: number; // en cm
  pregnancy_warning: boolean;
  image_ref: string;
  category: Category;
  level: Level;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Level {
  id: string;
  name: string;
  value: number;
}
