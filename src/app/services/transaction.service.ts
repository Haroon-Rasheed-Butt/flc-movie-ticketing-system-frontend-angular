import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly base = `${environment.apiBaseUrl}/accounts`;

  constructor(private readonly http: HttpClient) {}

  getTransactions(accountId: number): Observable<Transaction[]> {
    return this.http
      .get<ApiResponse<Transaction[]>>(`${this.base}/${accountId}/transactions`)
      .pipe(map((response) => response.data ?? []));
  }
}
