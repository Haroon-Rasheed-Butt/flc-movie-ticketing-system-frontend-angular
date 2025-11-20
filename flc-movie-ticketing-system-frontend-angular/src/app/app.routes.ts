import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'movies', loadComponent: () => import('./app/components/movies/movies-list/movies-list').then(m => m.MoviesList) },
  { path: 'types', loadComponent: () => import('./app/components/types/types-list/types-list').then(m => m.TypesList) },
  { path: 'accounts', loadComponent: () => import('./app/components/accounts/accounts-list/accounts-list').then(m => m.AccountsList) },
  { path: 'ratings', loadComponent: () => import('./app/components/ratings/ratings-list/ratings-list').then(m => m.RatingsList) },
  { path: 'cart-items', loadComponent: () => import('./app/components/cart-items/cart-items-list/cart-items-list').then(m => m.CartItemsList) },
  { path: 'transactions', loadComponent: () => import('./app/components/transactions/transactions-list/transactions-list').then(m => m.TransactionsList) },
  { path: '', redirectTo: 'movies', pathMatch: 'full' }
];
