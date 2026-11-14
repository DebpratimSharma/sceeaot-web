export interface LinkItem {
  title: string;
  url: string;
  iconImage?: string;
  description?: string;
  badge?: string;
  category?: "official" | "social";
  handle?: string;
}
