export interface IPrice {
  id: number;
  label: string;
  value: number;
}

export interface IApiPrice {
  id: number;
  label: string;
  value: number;
  created_at?: string;
  updated_at?: string;
}