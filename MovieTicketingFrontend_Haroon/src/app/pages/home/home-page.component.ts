import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { PageResponse } from '../../models/page-response.model';
import { SAMPLE_ACCOUNTS } from '../../shared/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  movies: Movie[] = [];
  page = 0;
  size = 6;
  totalElements = 0;
  pageSizes = [4, 6, 9];
  accountControl = new FormControl(SAMPLE_ACCOUNTS[0].id);
  isLoading = false;
  sampleAccounts = SAMPLE_ACCOUNTS;

  constructor(
    private readonly movieService: MovieService,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.movieService
      .getMovies(this.page, this.size)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((pageData: PageResponse<Movie>) => {
        this.movies = pageData.content;
        this.totalElements = pageData.totalElements;
      });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadMovies();
  }

  handleAddToCart(event: { movieId: number; accountId: number }): void {
    this.cartService.addToCart({
      accountId: Number(event.accountId),
      movieId: event.movieId,
      quantity: 1
    }).subscribe(() => {
      this.snackBar.open('Added to cart successfully', 'Close', { duration: 2500 });
    });
  }
}
