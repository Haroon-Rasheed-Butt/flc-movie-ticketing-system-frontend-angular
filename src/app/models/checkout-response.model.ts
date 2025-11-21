import { Transaction } from './transaction.model';

export interface CheckoutResponse {
  totalAmount: number;
  processedItems: number;
  transactions: Transaction[];
}
