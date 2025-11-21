import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { MovieDetailPageComponent } from './pages/movie-detail/movie-detail-page.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { AccountPageComponent } from './pages/account/account-page.component';
import { AdminMoviePageComponent } from './pages/admin/admin-movie-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'movies/:id', component: MovieDetailPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: 'admin/movies', component: AdminMoviePageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
