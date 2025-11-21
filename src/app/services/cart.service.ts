import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { CartItem } from '../models/cart-item.model';
import { CheckoutResponse } from '../models/checkout-response.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly cartBase = `${environment.apiBaseUrl}/cart`;
  private readonly accountsBase = `${environment.apiBaseUrl}/accounts`;

  constructor(private readonly http: HttpClient) {}

  getCart(accountId: number): Observable<CartItem[]> {
    return this.http
      .get<ApiResponse<CartItem[]>>(`${this.accountsBase}/${accountId}/cart`)
      .pipe(map((response) => response.data ?? []));
  }

  addToCart(payload: { accountId: number; movieId: number; quantity: number }): Observable<CartItem> {
    return this.http
      .post<ApiResponse<CartItem>>(this.cartBase, payload)
      .pipe(map((response) => response.data as CartItem));
  }

  checkout(accountId: number, cartItemIds: number[] = []): Observable<CheckoutResponse> {
    return this.http
      .post<ApiResponse<CheckoutResponse>>(`${environment.apiBaseUrl}/checkout`, {
        accountId,
        cartItemIds
      })
      .pipe(map((response) => response.data as CheckoutResponse));
  }
}
