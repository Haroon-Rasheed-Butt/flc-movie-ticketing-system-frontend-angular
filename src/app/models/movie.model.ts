export interface Movie {
  id: number;
  name: string;
  description: string | null;
  publicationYear: number | null;
  director: string | null;
  actor: string | null;
  genre: string | null;
  coverPhoto: string | null;
  ticketPrice: number;
  typeId: number;
  typeName: string;
  ownerId: number | null;
  ownerUsername: string | null;
}
