import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { RatingListComponent } from './components/rating-list/rating-list.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { MovieDetailPageComponent } from './pages/movie-detail/movie-detail-page.component';
import { CartPageComponent } from './pages/cart/cart-page.component';
import { AccountPageComponent } from './pages/account/account-page.component';
import { AdminMoviePageComponent } from './pages/admin/admin-movie-page.component';
import { MaterialModule } from './shared/material.module';
import { NotificationInterceptor } from './core/interceptors/notification.interceptor';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieCardComponent,
    RatingListComponent,
    ConfirmDialogComponent,
    HomePageComponent,
    MovieDetailPageComponent,
    CartPageComponent,
    AccountPageComponent,
    AdminMoviePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
