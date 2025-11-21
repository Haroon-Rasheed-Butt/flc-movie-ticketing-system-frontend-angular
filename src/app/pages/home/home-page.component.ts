import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { PageResponse } from '../../models/page-response.model';
import { SAMPLE_ACCOUNTS } from '../../shared/constants';
import { MessageService } from '../../core/services/message.service';

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
    private readonly messages: MessageService
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

  get totalPages(): number {
    const pages = Math.ceil(this.totalElements / this.size);
    return pages > 0 ? pages : 1;
  }

  changePage(step: number): void {
    const nextPage = this.page + step;
    if (nextPage < 0 || nextPage >= this.totalPages) {
      return;
    }
    this.page = nextPage;
    this.loadMovies();
  }

  updatePageSize(size: string | number): void {
    const parsed = Number(size);
    if (!parsed || parsed === this.size) {
      return;
    }
    this.size = parsed;
    this.page = 0;
    this.loadMovies();
  }

  updatePageSizeFromEvent(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if (!target) {
      return;
    }
    this.updatePageSize(target.value);
  }

  handleAddToCart(event: { movieId: number; accountId: number }): void {
    this.cartService
      .addToCart({
        accountId: Number(event.accountId),
        movieId: event.movieId,
        quantity: 1
      })
      .subscribe(() => {
        this.messages.show('Added to cart', 'success');
      });
  }
}
