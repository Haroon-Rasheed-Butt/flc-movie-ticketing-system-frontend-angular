export interface CartItem {
  id: number;
  quantity: number;
  purchased: boolean;
  purchaseDate: string | null;
  movieId: number;
  movieName: string;
  ticketPrice: number;
}
