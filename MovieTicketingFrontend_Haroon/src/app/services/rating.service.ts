import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Rating } from '../models/rating.model';

export interface RatingPayload {
  accountId: number;
  rating: number;
  comment?: string;
}

@Injectable({ providedIn: 'root' })
export class RatingService {
  private readonly movieBase = `${environment.apiBaseUrl}/movies`;

  constructor(private readonly http: HttpClient) {}

  getRatings(movieId: number): Observable<Rating[]> {
    return this.http
      .get<ApiResponse<Rating[]>>(`${this.movieBase}/${movieId}/ratings`)
      .pipe(map((response) => response.data ?? []));
  }

  addRating(movieId: number, payload: RatingPayload): Observable<Rating> {
    return this.http
      .post<ApiResponse<Rating>>(`${this.movieBase}/${movieId}/ratings`, payload)
      .pipe(map((response) => response.data as Rating));
  }
}
