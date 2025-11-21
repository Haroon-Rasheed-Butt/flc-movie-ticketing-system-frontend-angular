import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Movie } from '../models/movie.model';
import { PageResponse } from '../models/page-response.model';

export interface MoviePayload {
  name: string;
  description?: string;
  publicationYear?: number;
  director?: string;
  actor?: string;
  genre?: string;
  coverPhoto?: string;
  ticketPrice: number;
  typeId: number;
  accountId?: number;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly base = `${environment.apiBaseUrl}/movies`;

  constructor(private readonly http: HttpClient) {}

  getMovies(page = 0, size = 10): Observable<PageResponse<Movie>> {
    return this.http
      .get<ApiResponse<PageResponse<Movie>>>(`${this.base}?page=${page}&size=${size}`)
      .pipe(map((response) => response.data as PageResponse<Movie>));
  }

  getMovie(id: number): Observable<Movie> {
    return this.http
      .get<ApiResponse<Movie>>(`${this.base}/${id}`)
      .pipe(map((response) => response.data as Movie));
  }

  createMovie(payload: MoviePayload): Observable<Movie> {
    return this.http
      .post<ApiResponse<Movie>>(this.base, payload)
      .pipe(map((response) => response.data as Movie));
  }

  updateMovie(id: number, payload: MoviePayload): Observable<Movie> {
    return this.http
      .put<ApiResponse<Movie>>(`${this.base}/${id}`, payload)
      .pipe(map((response) => response.data as Movie));
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
