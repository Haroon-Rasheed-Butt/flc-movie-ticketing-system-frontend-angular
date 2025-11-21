import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private readonly base = `${environment.apiBaseUrl}/accounts`;

  constructor(private readonly http: HttpClient) {}

  createAccount(payload: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    rememberMe?: boolean;
  }): Observable<Account> {
    return this.http
      .post<ApiResponse<Account>>(this.base, payload)
      .pipe(map((response) => response.data as Account));
  }

  getAccount(id: number): Observable<Account> {
    return this.http
      .get<ApiResponse<Account>>(`${this.base}/${id}`)
      .pipe(map((response) => response.data as Account));
  }

  getTransactions(id: number): Observable<Transaction[]> {
    return this.http
      .get<ApiResponse<Transaction[]>>(`${this.base}/${id}/transactions`)
      .pipe(map((response) => response.data ?? []));
  }
}
