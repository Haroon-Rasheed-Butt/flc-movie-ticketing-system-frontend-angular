export interface Rating {
  id: number;
  rating: number;
  comment: string | null;
  ratingDate: string | null;
  movieId: number;
  accountId: number;
}
