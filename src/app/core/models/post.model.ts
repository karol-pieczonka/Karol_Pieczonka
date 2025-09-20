export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  startDate: Date;
  endDate: Date;
  isFavorite?: boolean;
}
